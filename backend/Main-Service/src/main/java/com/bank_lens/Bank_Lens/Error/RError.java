package com.bank_lens.Bank_Lens.Error;

import java.util.Map;

public record RError(
        Map<String,String> error
) {
}
