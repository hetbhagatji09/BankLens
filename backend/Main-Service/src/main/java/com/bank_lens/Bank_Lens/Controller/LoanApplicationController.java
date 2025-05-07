package com.bank_lens.Bank_Lens.Controller;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import com.bank_lens.Bank_Lens.Service.LoanApplicationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class LoanApplicationController {

    private final LoanApplicationService service;

    public LoanApplicationController(LoanApplicationService service) {
        this.service = service;
    }

    @PostMapping("/loan-applications")
    public LoanApplication save(@RequestParam("loan-data") String loanDataJson,
                                @RequestParam("csv-file") MultipartFile multipartFile) throws JsonProcessingException {
        LoanApplication loanApplication = new ObjectMapper().readValue(loanDataJson, LoanApplication.class);
        return service.saveApplication(loanApplication, multipartFile);
    }


}
