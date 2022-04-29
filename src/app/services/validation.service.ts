import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormulaService } from './formula.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private formulaService: FormulaService) {}

  public readonly validationRegexes: any = {
    counterValidChars: [/^[0-9]*$/], // zero to infinite positive numbers only.
    moneyValidChars: [
      /^[0-9\.-]*$/, // allow all digits, negative signs and decimal points.
      /^-?[^-]*$/, // one or fewer negative signs, must be at beginning
      /^[^\.]*\.?[^\.]*$/, // one or fewer decimals, can be anywhere
    ]
  }

  // As of yet, we cannot differentiate between an empty field (valid) and an invalid NaN field (e, -0, 12-3, etc). Both return null.
  // https://github.com/angular/angular/issues/2962

  counterFieldValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let errors: any = {};
      const value = control.value;
      if (this.formulaService.isValidNumber(value)) {
        if (value < 0) {
          errors['positivesOnly'] = 'Value cannot be negative.'
        }
        for (let regex of this.validationRegexes.counterValidChars) {
          const validChars = regex.test(value);
          if (!validChars) {
            errors['invalidCharacter'] = 'Field contains an invalid character.';
          }
        }
      }
      return errors ? errors : null;
    };
  }

  moneyFieldValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let errors: any = {};
      const value = control.value;
      if (this.formulaService.isValidNumber(value)) {
        for (let regex of this.validationRegexes.moneyValidChars) {
          const validChars = regex.test(value);
          if (!validChars) {
            errors['invalidCharacter'] = 'Field contains an invalid character or is formatted incorrectly.';
          }
        }
      }
      return errors ? errors : null;
    };
  }
}
