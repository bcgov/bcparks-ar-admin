import { formatCurrency, formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';

export interface formulaResult {
  result: any;
  formula?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  // TODO: these variables could be set in config
  public gstPercent = 5;
  public defaultDecimalPlaces = 1;

  constructor() {}

  /**
   * Since `number: 0` is falsy in Typescript by default, we need a way to include `0` as a truthy value for certain fields.
   * @function
   * @param {number} n Value to check
   * @memberof FormulaService
   * @returns `true` if `n` is an integer, including 0, otherwise `false`
   */
  isValidNumber(n: number) {
    if (!n) {
      if (n === 0) {
        return true;
      }
      return false;
    }
    return true;
  }

  /**
   * Returns `n` if `n` is an integer, including 0, otherwise `undefined`
   * @function
   * @param {number} n Value to check
   * @memberof FormulaService
   * @returns `n` if `n` is an integer, including 0, otherwise `undefined`
   */
  checkValidNumber(n: number) {
    if (this.isValidNumber(n)) {
      return n;
    }
    return undefined;
  }

  /**
   * Returns the sum of all numbers in an array, unless there are no non-null values.
   * @function
   * @param {any[]} arr Array to summarize
   * @memberof FormulaService
   * @returns number (or `undefined` if array is all null values)
   */
  arraySum(arr: any[]): any {
    let sum: number = 0;
    let nullArray = true;
    for (let num of arr) {
      if (this.isValidNumber(num)) {
        sum += num;
        nullArray = false;
      }
    }
    if (nullArray) {
      return undefined;
    }
    return sum;
  }

  /**
   * Returns the result when value is deducted by percent
   * @function
   * @param {number} value Original value
   * @param {number} percentage percentage to deduct (10 = 10%)
   * @memberof FormulaService
   * @returns number
   */
  deductPercentage(value: number, percentage: number): number {
    const result = (value * (100 - percentage)) / 100;
    return result;
  }

  /**
   * Formats money in $CAD to the nearest cent.
   * @function
   * @param {number} amt total value
   * @memberof FormulaService
   * @returns string
   */
  formatMoney(amt: number): string {
    return formatCurrency(amt, 'en-CA', '$', undefined, '1.2-2');
  }

  /**
   * Formats decimal number to proper number of decimal places
   * @function
   * @param {number} value Number
   * @param {number} dPlaces Number of decimal places (optional)
   * @memberof FormulaService
   * @returns string
   */
  formatDecimal(value: number, dPlaces?: number): string {
    if (!dPlaces) {
      dPlaces = this.defaultDecimalPlaces;
    }
    return formatNumber(value, 'en-CA', `1.0-${dPlaces}`);
  }

  /**
   * Calculates gross revenue and then deducts 5% GST.
   * @function
   * @param {any[]} revenues Array of revenue numbers
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  basicNetRevenue(revenues: any[]): formulaResult {
    let result: any = null;
    const gross = this.arraySum(revenues);
    const net = this.deductPercentage(gross, this.gstPercent);
    if (this.isValidNumber(gross)) {
      result = this.formatMoney(net);
    }
    let res: formulaResult = {
      result: result,
      formula: `Net revenue = Gross revenue - ${this.gstPercent}% GST`,
    };
    return res;
  }

  /**
   * Calculates (sum of array) x modifier
   * @function
   * @param {any[]} arr Array of values
   * @param {number?} mod Multiplier (optional)
   * @memberof FormulaService
   * @returns number
   */
  totalWithModifier(arr: any[], mod?: number): number {
    let result = this.arraySum(arr);
    if (mod) {
      result *= mod;
    }
    return result;
  }

  /**
   * Calculates & formats (sum of array) x modifier
   * @function
   * @param {any[]} arr Array of values
   * @param {number?} mod Multiplier (optional)
   * @memberof FormulaService
   * @returns string
   */
  formatTotalWithModifier(arr: any[], mod?: number): string {
    let result: any = null;
    let total = this.totalWithModifier(arr, mod);
    if (this.isValidNumber(total)) {
      result = this.formatDecimal(total);
    }
    return result;
  }

  /**
   * Calculates total attendance for frontcountry camping - camping part nights section.
   * @function
   * @param {any[]} attendances Array of attendance numbers
   * @param {number?} modifier Multiplier (optional)
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  frontcountryCampingPartyAttendance(
    attendances: any[],
    modifier?: number
  ): formulaResult {
    let formula = `Total attendance = (Standard + Senior + SSFE + Long stay)`;
    if (modifier) {
      formula += ` x ${modifier}`;
    }
    return {
      result: this.formatTotalWithModifier(attendances, modifier),
      formula: formula,
    };
  }

  /**
   * Calculates total attendance for frontcountry camping - additional vehicles section.
   * @function
   * @param {any[]} attendances Array of attendance numbers
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  frontcountryCampingSecondCarAttendance(attendances: any[]): formulaResult {
    return {
      result: this.formatTotalWithModifier(attendances),
      formula: `Total attendance = (Standard + Senior + SSFE)`,
    };
  }

  /**
   * Calculates total attendance for group camping - standard attendance section.
   * @function
   * @param {any[]} attendances Array of attendance numbers
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  groupCampingStandardAttendance(attendances: any[]): formulaResult {
    return {
      result: this.formatTotalWithModifier(attendances),
      formula: `Total people = (Adult + Youth + Children)`,
    };
  }

  /**
   * Calculates total vehicle attendance for day use.
   * @function
   * @param {any[]} vehicles Array of vehicle numbers
   * @param {any[]} buses Array of bus numbers
   * @param {number} vehicleMod Multiplier for vehicles (optional)
   * @param {number} busMod Multiplier for buses (optional)
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  dayUseVehicleAttendance(
    vehicles: any[],
    buses: any[],
    vehicleMod?: number,
    busMod?: number
  ): formulaResult {
    let vehicleTotal = this.totalWithModifier(vehicles, vehicleMod);
    let busTotal = this.totalWithModifier(buses, busMod);
    let vehicleFormula = 'Vehicles';
    let busFormula = 'Bus count';
    if (vehicleMod) {
      vehicleFormula = `(Vehicles x ${vehicleMod})`;
    }
    if (busMod) {
      busFormula = `(Bus count x ${busMod})`;
    }
    return {
      result: this.formatTotalWithModifier([vehicleTotal, busTotal]),
      formula: `Vehicle attendance = ${vehicleFormula} + ${busFormula}`,
    };
  }

  /**
   * Calculates total people attendance for backcountry cabins.
   * @function
   * @param {any[]} individuals Array of individual people counts
   * @param {any[]} families Array of family counts
   * @param {number} familyMod Multiplier for families (optional)
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  backcountryCabinsAttendance(
    individuals: any[],
    families: any[],
    familyMod?: number
  ): formulaResult {
    let individualTotal = this.totalWithModifier(individuals);
    let familyTotal = this.totalWithModifier(families, familyMod);
    let familyFormula = 'Family';
    if (familyMod) {
      familyFormula = `(Family x ${familyMod})`;
    }
    return {
      result: this.formatTotalWithModifier([individualTotal, familyTotal]),
      formula: `Total people = Adults + Children + ${familyFormula}`,
    };
  }

  /**
   * Calculates boat attendance for boating section.
   * @function
   * @param {any[]} attendances Array of attendance numbers
   * @param {number?} modifier Multiplier (optional)
   * @memberof FormulaService
   * @returns `formulaResult` object
   */
  boatingAttendance(attendances: any[], modifier?: number): formulaResult {
    let formula = `Boat attendance = (On dock + On buoys + Miscellaneous boats)`;
    if (modifier) {
      formula += ` x ${modifier}`;
    }
    return {
      result: this.formatTotalWithModifier(attendances, modifier),
      formula: formula,
    };
  }
}
