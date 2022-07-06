import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  let service: FormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid numbers, including 0, as truthy', () => {
    const arr = [1, 100, 1.234, 0, 0.0, 0.001];
    for (let item of arr) {
      expect(service.isValidNumber(item)).toBeTruthy();
    }
    expect(service.isValidNumber(NaN)).toBeFalsy();
  });

  it('should summarize arrays correctly', () => {
    expect(service.arraySum([1, 2, 3, 4, 5])).toBe(15);
    expect(service.arraySum([0, 1, 2, 3, 4])).toBe(10);
    expect(service.arraySum([0, 0, 0, 0, 0])).toBe(0);
    expect(service.arraySum(['text', 0, 3, 4, NaN])).toBe(7);
    expect(service.arraySum([null, 1, 2, 3, 4])).toBe(10);
    expect(service.arraySum([null, undefined, NaN])).toBeUndefined();
    expect(service.arraySum([NaN, NaN, NaN])).toBeUndefined();
    expect(service.arraySum([NaN, undefined, null, 0, 1])).toBe(1);
  });

  it('should deduct percentages correctly', () => {
    expect(service.inversePercentage(50, 100)).toBe(25);
    expect(service.inversePercentage(5, 37)).toBeCloseTo(3.65, 2);
    expect(service.inversePercentage(0, 25)).toBe(0);
    expect(service.inversePercentage(25, 0)).toBe(25);
    expect(service.inversePercentage(25, 100)).toBe(12.5);
    expect(service.inversePercentage(1, 0.005)).toBeCloseTo(1, 3);
    expect(service.inversePercentage(NaN, 50)).toBeNaN();
    expect(service.inversePercentage(100, NaN)).toBeNaN();
  });

  it('should format money correctly', () => {
    expect(service.formatMoney(123)).toBe('$123.00');
    expect(service.formatMoney(123.45)).toBe('$123.45');
    expect(service.formatMoney(0.005)).toBe('$0.01');
    expect(service.formatMoney(1.004)).toBe('$1.00');
    expect(service.formatMoney(0)).toBe('$0.00');
    expect(service.formatMoney(NaN)).toBe('');
  });

  it('should format decimal numbers correctly', () => {
    expect(service.formatDecimal(1)).toBe('1');
    expect(service.formatDecimal(1.25, 1)).toBe('1.3');
    expect(service.formatDecimal(1.24, 1)).toBe('1.2');
    expect(service.formatDecimal(NaN, 1)).toBe('');
  });

  it('should calculate baseNetRevenue properly', () => {
    expect(service.basicNetRevenue([1, 2, 3], 5).result).toBe('$5.71');
    expect(service.basicNetRevenue([0, 0, 0]).result).toBe('$0.00');
    expect(service.basicNetRevenue([NaN, 0, 25], 10).result).toBe('$22.73');
    expect(service.basicNetRevenue([NaN, 0, 25], 10).formula).toBe(
      'Net revenue = Gross revenue - 10% GST'
    );
    expect(service.basicNetRevenue([NaN]).result).toBeNull();
  });

  it('should summarize an array and multiply by a modifier properly', () => {
    expect(service.totalWithModifier([1, 2, 3], 5)).toBe(30);
    expect(service.totalWithModifier([1, 2, NaN], 5)).toBe(15);
    expect(service.totalWithModifier([1, 2, NaN], 0)).toBe(0);
    expect(service.totalWithModifier([NaN])).toBeUndefined();
  });

  it('should format an array x modifier properly', () => {
    expect(service.formatTotalWithModifier([1, 2, 3], 5)).toBe('30');
    expect(service.formatTotalWithModifier([0.1, 2.55, NaN], 5)).toBe('13.3');
    expect(service.formatTotalWithModifier([1, 2, NaN], 0)).toBe('0');
    expect(service.formatTotalWithModifier([NaN])).toBeUndefined();
  });

});
