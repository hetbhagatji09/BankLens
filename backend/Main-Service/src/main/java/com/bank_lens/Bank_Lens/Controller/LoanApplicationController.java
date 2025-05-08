package com.bank_lens.Bank_Lens.Controller;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import com.bank_lens.Bank_Lens.Service.LoanApplicationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/monthly")
    public Map<String,Object> getDashBoardMonthlyData(){
        return service.daskBoardMonthlyChart();
    }

    @GetMapping("/pie-chart")
    public Map<String,Object> getDashBoardPieChart(){
        return service.daskBoardPieChart();
    }

    @GetMapping("/")
    public List<LoanApplication> getCurrentYearData(){
        return service.findByYear();
    }

    @GetMapping("/approve")
    public List<LoanApplication> getCurrentYearDataOfApprove(){
        return service.findByYearAndApprove();
    }
    @GetMapping("/reject")
    public List<LoanApplication> getCurrentYearDataOfReject(){
        return service.findByYearAndRejected();
    }
    @GetMapping("/yearData")
    public Map<String,Object> getFourYearLoanData(){
        return service.getSumOfLastFourYearsOfLoan();

    }
    @GetMapping("/quaterData")
    public List<Float> getYearQuaterData(){
        return service.reportByQ();
    }
    @GetMapping("/applications")
    public List<LoanApplication> getApplications(){
        return service.findAll();
    }

    @GetMapping("/firstFive")
    public List<LoanApplication> getFirstFive(){
        return service.findFirstFive();
    }
    @GetMapping("/{id}")
    public LoanApplication getLoanApplicationById(@PathVariable Long id){
        return  service.getLoanById(id);
    }
    @GetMapping("/all")
    public List<LoanApplication> getLoanApplications(){
        return service.findAll();
    }


}
