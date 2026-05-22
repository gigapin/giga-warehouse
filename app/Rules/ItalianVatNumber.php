<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ItalianVatNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^\d{11}$/', $value)) {
            $fail('Il campo :attribute deve essere un numero di partita IVA di 11 cifre.');
            return;
        }

        $sum = 0;
        for ($i = 0; $i < 10; $i++) {
            $d = (int) $value[$i];
            if ($i % 2 === 0) {
                $sum += $d;
            } else {
                $x = $d * 2;
                $sum += $x >= 10 ? $x - 9 : $x;
            }
        }

        if ((10 - ($sum % 10)) % 10 !== (int) $value[10]) {
            $fail('Il campo :attribute non è una partita IVA valida.');
        }
    }
}
