package com.bank_lens.Bank_Lens.Repository;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication,Long> {

    @QueryHints(@QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true"))
    @Query(value = "SELECT * FROM loan_application WHERE EXTRACT(YEAR FROM created_date) = :currentYear", nativeQuery = true)

    List<LoanApplication> findByYear(@Param("currentYear") int year);




}