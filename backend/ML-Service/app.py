from flask import Flask, request, jsonify
import joblib
import requests
import warnings
import numpy as np
import pandas as pd
import io

warnings.filterwarnings('ignore')
app = Flask(__name__)

# Load model and preprocessors
model = joblib.load(r'artifacts\logistic_model.pkl')
scaler = joblib.load(r'artifacts\scaler.pkl')
label_encoders = joblib.load(r'artifacts\label_encoders.pkl')
feature_columns = joblib.load(r'artifacts\feature_columns.pkl')

# Hello World route
@app.route('/hello', methods=['GET'])
def hello():
    print("Expected feature columns:", feature_columns)

    return jsonify({'message': 'Hello, World! Flask is working 🚀'})


def predict_loan_default(input_data, model, scaler, label_encoders, feature_columns):
    """
    Predicts loan default for a single input.

    Parameters:
    - input_data: dict, input data for one person
    - model: trained classification model (e.g., logistic regression)
    - scaler: fitted StandardScaler object
    - label_encoders: dict of fitted LabelEncoders for categorical features
    - feature_columns: list of original feature column names used in training

    Returns:
    - prediction: 0 or 1
    - probability: float between 0 and 1
    """
    # Convert input dict to DataFrame
    input_df = pd.DataFrame([input_data])
    input_df.drop('csvfile',inplace=True,axis=1)
    input_df.columns = [col[0].upper() + col[1:] if col else col for col in input_df.columns]
    input_df.rename(columns={'Dtiratio': 'DTIRatio'}, inplace=True)

    print(input_df)

    # Encode categorical features
    for col in input_df.select_dtypes(include='object').columns:
        if col in label_encoders:
            input_df[col] = label_encoders[col].transform(input_df[col])
        else:
            raise ValueError(f"Missing label encoder for column: {col}")

    # Ensure the column order matches training data
    input_df = input_df[feature_columns]

    # Scale features
    input_scaled = scaler.transform(input_df)

    # Predict
    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]

    return prediction, probability


@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        csv_url=input_data.get("csvfile")
        input_data.pop("id", None)
        input_data.pop("status", None)
        input_data.pop("confidence", None)
        input_data.pop("createdDate", None)
        input_data.pop("name", None)
        input_data.pop("customerName", None)
        
     
          
        if not csv_url:
            return jsonify({"error": "Missing CSVFile URL in request."}), 400
        
         # Download CSV from URL (e.g., Cloudinary)
        response = requests.get(csv_url)
       
        if response.status_code != 200:
            return jsonify({"error": "Failed to download CSV from URL"}), 400

        # Read CSV to DataFrame
        statements = pd.read_csv(io.StringIO(response.text))
       
        # Extract latest balance
        latest_balance = statements['balance'].dropna().iloc[-1]
        

        # Add to application input
        input_data['Balance'] = latest_balance
       


        prediction, probability = predict_loan_default(
            input_data=input_data,
            model=model,
            scaler=scaler,
            label_encoders=label_encoders,
            feature_columns=feature_columns
        )
        print("The void")

        # 1 = no default, 0 = default (reversed for compatibility)
        return jsonify({
            "status": 1 if prediction == 0 else 0,
            "confidence": round(1 - probability, 4)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
