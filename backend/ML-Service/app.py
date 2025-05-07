from flask import Flask,Request,jsonify
import joblib
import warnings
warnings.filterwarnings('ignore')
import numpy as np
app=Flask(__name__)

model=joblib.load('artifacts\logistic_model.pkl')
scaler = joblib.load('artifacts\scaler.pkl')
label_encoders = joblib.load('artifacts\label_encoders.pkl')
feature_columns = joblib.load('artifacts\feature_columns.pkl')


