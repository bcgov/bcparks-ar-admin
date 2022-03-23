import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoTextModule } from '../shared/components/info-text/info-text.module';
import { SelectModule } from '../shared/components/select/select.module';
import { TypeaheadModule } from '../shared/components/typeahead/typeahead.module';

import { EnterDataComponent } from './enter-data.component';

describe('EnterDataComponent', () => {
  let component: EnterDataComponent;
  let fixture: ComponentFixture<EnterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeaheadModule, InfoTextModule, SelectModule],
      declarations: [EnterDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
