import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;
  let form: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
    });
    service = TestBed.inject(ValidationService);
    form = new UntypedFormGroup({
      counter: new UntypedFormControl(
        null,
        service.counterFieldValidator()
      ),
      money: new UntypedFormControl(
        null,
        service.moneyFieldValidator()
      )
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a form', () => {
    expect(form).toBeTruthy();
    expect(form.get('counter').value).toBeNull();
    expect(form.get('money').value).toBeNull();
  })

  it('should pass valid counter fields', () => {
    const arr = [undefined, null, NaN, 0, 1];
    for (let test of arr){
      form.get('counter').setValue(test);
      expect(form.get('counter').errors).toEqual({});
    }
  })

  it('should pass valid money fields', () => {
    const arr = [undefined, null, NaN, '-', 0, 1, -1, 0.0, 0.1, -0.005, -0.004];
    for (let test of arr){
      form.get('money').setValue(test);
      expect(form.get('money').errors).toEqual({});
    }
  })

  it('should catch invalid counter fields', () => {
    const arr = ['-', 0.1, -1, 'e', 'E'];
    for (let test of arr) {
      form.get('counter').setValue(test);
      expect(form.get('counter').errors).not.toEqual({})
    }
  })

  it('should catch invalid money fields', () => {
    const arr = ['e', 'E', '0-5', '1.1.1', '0-'];
    for (let test of arr) {
      form.get('money').setValue(test);
      expect(form.get('money').errors).not.toEqual({})
    }
  })
});
