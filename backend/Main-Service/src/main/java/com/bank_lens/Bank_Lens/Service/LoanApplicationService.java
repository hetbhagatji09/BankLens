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

    private static final String MODEL_URL = "http://localhost:8080/api/users";

    private final FileUpload fileUpload;
    private final LoanApplicationRepository repository;

    public LoanApplicationService(FileUpload fileUpload, LoanApplicationRepository repository) {
        this.fileUpload = fileUpload;
        this.repository = repository;
    }

    public LoanApplication saveApplication(LoanApplication application, MultipartFile csvFile) {

        String path = "";
        try {
            path = fileUpload.uploadFile(csvFile);
        }catch (IOException _){
            throw  new EntityNotFoundException("CSV File Not Found ");
        }

        application.setCSVFile(path);
        RestTemplate restTemplate  = new RestTemplate();

        ResponseEntity<Map> outputOfModel = restTemplate.postForEntity(MODEL_URL,application,Map.class);

        if (outputOfModel.getStatusCode().is2xxSuccessful() && outputOfModel.getBody() != null) {
            Map<String, Object> ans = outputOfModel.getBody();
            application.setConfidence((Float) ans.get("Confidence"));
            application.setStatus((Boolean) ans.get("Status"));
        } else {
            throw new ModelFailedException("Model Can Not");
        }

        return  repository.save(application);
    }


}
