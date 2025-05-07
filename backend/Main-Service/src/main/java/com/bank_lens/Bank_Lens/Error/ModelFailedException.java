package com.bank_lens.Bank_Lens.Error;

public class ModelFailedException extends RuntimeException {
    public ModelFailedException(String message){
        super(message);
    }
}
