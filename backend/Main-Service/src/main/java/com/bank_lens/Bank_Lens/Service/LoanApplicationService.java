package com.bank_lens.Bank_Lens.Service;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import com.bank_lens.Bank_Lens.Error.ModelFailedException;
import com.bank_lens.Bank_Lens.Repository.LoanApplicationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LoanApplicationService {

    @Value("${MODEL_URL}")
    private String MODEL_URL;

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
    public Map<String, Object> daskBoardMonthlyChart() {
        List<LoanApplication> currentYearApplication = this.findByYear();

        Map<Integer, List<LoanApplication>> grouped = currentYearApplication.stream()
                .collect(Collectors.groupingBy(app ->
                        app.getCreatedDate()
                                .toInstant()
                                .atZone(ZoneId.systemDefault())
                                .getMonthValue() - 1
                ));

        List<Long> approveApplicationCount = new ArrayList<>(Collections.nCopies(12, 0L));
        List<Long> rejectedApplicationCount = new ArrayList<>(Collections.nCopies(12, 0L));

        grouped.forEach((month, monthlyApplications) -> {
            long approved = monthlyApplications.stream()
                    .filter(LoanApplication::getStatus)
                    .count();

            approveApplicationCount.set(month, approved);
            rejectedApplicationCount.set(month, monthlyApplications.size() - approved);
        });

        return Map.of(
                "Approve", approveApplicationCount,
                "Reject", rejectedApplicationCount
        );
    }

    public Map<String, Object> daskBoardPieChart() {
        List<LoanApplication> currentYearApplication = this.findByYear();

        Map<String, List<LoanApplication>> grouped = currentYearApplication.stream()
                .collect(Collectors.groupingBy(LoanApplication::getLoanPurpose));

        List<String> loanPurpose = new ArrayList<>();
        List<Long> purposeCount = new ArrayList<>();

        grouped.forEach((purpose, list) -> {
            long count = list.stream().filter(LoanApplication::getStatus).count();
            loanPurpose.add(purpose);
            purposeCount.add(count);
        });

        return Map.of(
                "Purpose", loanPurpose,
                "PurposeCount", purposeCount
        );
    }

    public List<LoanApplication> findByYear(){
        int currentYear = LocalDate.now().getYear();
        return repository.findByYear(currentYear);
    }

    public List<LoanApplication> findByYearAndApprove(){
        return findByYear().stream().filter(LoanApplication::getStatus).toList();
    }

    public List<LoanApplication> findByYearAndRejected(){
        return findByYear().stream().filter(e->!e.getStatus()).toList();
    }

    private List<LoanApplication> getApplicationsFromLastFourYears() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, -4);
        Date fourYearsAgo = cal.getTime();
        return repository.findAllFromLastFourYears(fourYearsAgo);
    }

    public Map<String,Object> getSumOfLastFourYearsOfLoan(){
        var loanApplication = getApplicationsFromLastFourYears();

        Map<Integer, List<LoanApplication>> filterLoanApplication = loanApplication.stream()
                .collect(Collectors.groupingBy(
                        application -> application.getCreatedDate().toInstant()
                                .atZone(ZoneId.systemDefault())
                                .getYear(),
                        TreeMap::new,
                        Collectors.toList()
                ));

        List<Integer> years = new ArrayList<>();
        List<Long> totalLoanAmount = new ArrayList<>();

        filterLoanApplication.forEach((year, applications) -> {
            long totalAmount = applications.stream()
                    .filter(LoanApplication::getStatus)
                    .mapToLong(LoanApplication::getLoanAmount)
                    .sum();

            years.add(year);
            totalLoanAmount.add(totalAmount);
        });

        return Map.of(
                "Years", years,
                "TotalAmount",totalLoanAmount
        );
    }


    public List<Float> reportByQ() {
        var loanApplications = findByYear();

        Map<Integer, List<LoanApplication>> byQuarter = loanApplications.stream()
                .collect(Collectors.groupingBy(app -> {
                    int month = app.getCreatedDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .getMonthValue();
                    return (month - 1) / 3;
                }));

        List<Float> response = new ArrayList<>(Collections.nCopies(4, 0F));

        for (int q = 0; q < 4; q++) {
            List<LoanApplication> apps = byQuarter.getOrDefault(q, Collections.emptyList());
            if (!apps.isEmpty()) {
                long approved = apps.stream().filter(LoanApplication::getStatus).count();
                float pct = 100F * ((float) approved / apps.size());
                response.set(q, pct);
            }
        }

        return response;
    }


    public List<LoanApplication> findAll() {
        return repository.findAll();
    }

    public List<LoanApplication> findFirstFive() {
        Pageable topFive = PageRequest.of(0, 5);
        return repository.findRecentLoanApplications(topFive);
    }

    public LoanApplication getLoanById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
