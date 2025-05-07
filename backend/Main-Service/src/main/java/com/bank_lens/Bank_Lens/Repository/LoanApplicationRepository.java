package com.bank_lens.Bank_Lens.Repository;

import com.bank_lens.Bank_Lens.Entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication,Long> {
}
