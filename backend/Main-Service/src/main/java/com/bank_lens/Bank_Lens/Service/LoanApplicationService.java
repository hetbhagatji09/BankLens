package com.bank_lens.Bank_Lens.Service;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import com.bank_lens.Bank_Lens.Error.ModelFailedException;
import com.bank_lens.Bank_Lens.Repository.LoanApplicationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class LoanApplicationService {

    private static final String MODEL_URL = "http://localhost:5000/predict";

    private final FileUpload fileUpload;
    private final LoanApplicationRepository repository;

    public LoanApplicationService(FileUpload fileUpload, LoanApplicationRepository repository) {
        this.fileUpload = fileUpload;
        this.repository = repository;
    }

    public LoanApplication saveApplication(LoanApplication application, MultipartFile csvFile) {
        String path = "";
        try {
            path = fileUpload.uploadFile(csvFile); // Assuming fileUpload.uploadFile method is correct
        } catch (IOException e) {
            throw new EntityNotFoundException("CSV File Not Found");
        }

        application.setCSVFile(path);
        RestTemplate restTemplate = new RestTemplate();

        try {
            System.out.println(application.getCSVFile());
            System.out.println(application.getLoanAmount());
            // Make a request to the ML model API
            ResponseEntity<Map> outputOfModel = restTemplate.postForEntity(MODEL_URL, application, Map.class);

            if (outputOfModel.getStatusCode().is2xxSuccessful() && outputOfModel.getBody() != null) {
                Map<String, Object> ans = outputOfModel.getBody();

                // Parse confidence and status from the model response safely
                if (ans.containsKey("confidence") && ans.containsKey("status")) {
                    application.setConfidence(Float.parseFloat(ans.get("confidence").toString()));
                    application.setStatus(((Integer) ans.get("status")) == 1); // Status: 1 = No default, 0 = Default
                } else {
                    throw new ModelFailedException("Invalid model response: Missing 'confidence' or 'status'");
                }
            } else {
                throw new ModelFailedException("Model API request failed with status: " + outputOfModel.getStatusCode());
            }
        } catch (Exception e) {
            throw new ModelFailedException("Error calling the model: " + e.getMessage());
        }

        // Save the loan application in the repository
        return repository.save(application);
    }


}
