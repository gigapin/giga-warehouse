<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ItalianFiscalCode implements ValidationRule
{
    // Pattern for natural persons: 6 letters, 2 digits, 1 letter, 2 digits, 1 letter, 3 digits, 1 letter (check char)
    private const CF_PATTERN = '/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/';

    // Lookup table for odd-indexed characters (0-indexed: 0,2,4,...,14)
    private const ODD = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $v = strtoupper($value);

        // Legal entity: 11 digits → same checksum as P.IVA
        if (strlen($v) === 11 && ctype_digit($v)) {
            (new ItalianVatNumber)->validate($attribute, $v, $fail);
            return;
        }

        if (!preg_match(self::CF_PATTERN, $v)) {
            $fail('Il campo :attribute non è un codice fiscale valido.');
            return;
        }

        $sum = 0;
        for ($i = 0; $i < 15; $i++) {
            $c = ctype_digit($v[$i]) ? (int) $v[$i] : (ord($v[$i]) - 65);
            // Odd positions (0-indexed): use lookup table; even positions: use value directly
            $sum += $i % 2 === 0 ? self::ODD[$c] : $c;
        }

        if (chr(($sum % 26) + 65) !== $v[15]) {
            $fail('Il campo :attribute non è un codice fiscale valido.');
        }
    }
}
