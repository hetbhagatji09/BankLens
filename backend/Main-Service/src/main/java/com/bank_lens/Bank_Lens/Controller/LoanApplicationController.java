package com.bank_lens.Bank_Lens.Controller;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import com.bank_lens.Bank_Lens.Service.LoanApplicationService;
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

    @PutMapping("/")
    public LoanApplication save(@RequestParam LoanApplication loanApplication,@RequestParam("csv-file") MultipartFile multipartFile){
        return service.saveApplication(loanApplication,multipartFile);
    }


}
