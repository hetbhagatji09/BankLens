package com.bank_lens.Bank_Lens.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoanApplication {

    @Id
    @GeneratedValue
    private Long id;

    private String Name;

    private String CustomerName;

    private int Age;

    private long Income;

    private long LoanAmount;

    private int CreditScore;

    private int MonthsEmployed;

    private int NumCreditLines;

    private float InterestRate;

    private int LoanTerm;

    private float DTIRatio;

    private String Education;

    private String EmploymentType;

    private String MaritalStatus;

    private boolean HasMortgage;

    private boolean HasDependents;

    private String LoanPurpose;

    private boolean HasCoSigner;

    private String CSVFile;

    private Boolean Status;

    private Float Confidence;

    @Column(updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = new Date();
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getCustomerName() {
        return CustomerName;
    }

    public void setCustomerName(String customerName) {
        CustomerName = customerName;
    }

    public long getIncome() {
        return Income;
    }

    public void setIncome(long income) {
        Income = income;
    }

    public int getAge() {
        return Age;
    }

    public void setAge(int age) {
        Age = age;
    }

    public long getLoanAmount() {
        return LoanAmount;
    }

    public void setLoanAmount(long loanAmount) {
        LoanAmount = loanAmount;
    }

    public int getCreditScore() {
        return CreditScore;
    }

    public void setCreditScore(int creditScore) {
        CreditScore = creditScore;
    }

    public int getMonthsEmployed() {
        return MonthsEmployed;
    }

    public void setMonthsEmployed(int monthsEmployed) {
        MonthsEmployed = monthsEmployed;
    }

    public int getNumCreditLines() {
        return NumCreditLines;
    }

    public void setNumCreditLines(int numCreditLines) {
        NumCreditLines = numCreditLines;
    }

    public float getInterestRate() {
        return InterestRate;
    }

    public void setInterestRate(float interestRate) {
        InterestRate = interestRate;
    }

    public int getLoanTerm() {
        return LoanTerm;
    }

    public void setLoanTerm(int loanTerm) {
        LoanTerm = loanTerm;
    }

    public float getDTIRatio() {
        return DTIRatio;
    }

    public void setDTIRatio(float DTIRatio) {
        this.DTIRatio = DTIRatio;
    }

    public String getEducation() {
        return Education;
    }

    public void setEducation(String education) {
        Education = education;
    }

    public String getEmploymentType() {
        return EmploymentType;
    }

    public void setEmploymentType(String employmentType) {
        EmploymentType = employmentType;
    }

    public boolean isHasMortgage() {
        return HasMortgage;
    }

    public void setHasMortgage(boolean hasMortgage) {
        HasMortgage = hasMortgage;
    }

    public String getMaritalStatus() {
        return MaritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        MaritalStatus = maritalStatus;
    }

    public boolean isHasDependents() {
        return HasDependents;
    }

    public void setHasDependents(boolean hasDependents) {
        HasDependents = hasDependents;
    }

    public String getLoanPurpose() {
        return LoanPurpose;
    }

    public void setLoanPurpose(String loanPurpose) {
        LoanPurpose = loanPurpose;
    }

    public Boolean getStatus() {
        return Status;
    }

    public void setStatus(Boolean status) {
        Status = status;
    }

    public Float getConfidence() {
        return Confidence;
    }

    public void setConfidence(Float confidence) {
        Confidence = confidence;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getCSVFile() {
        return CSVFile;
    }

    public void setCSVFile(String CSVFile) {
        this.CSVFile = CSVFile;
    }

    public boolean isHasCoSigner() {
        return HasCoSigner;
    }

    public void setHasCoSigner(boolean hasCoSigner) {
        HasCoSigner = hasCoSigner;
    }
}
