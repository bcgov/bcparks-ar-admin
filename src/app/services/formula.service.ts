import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  constructor() {}

  // validates line items: 0 is not the same as null/undefined.
  validateLineItemValue(n: number) {
    if (!n) {
      if (n === 0) {
        return 0;
      }
      return undefined;
    }
    return n;
  }
}
