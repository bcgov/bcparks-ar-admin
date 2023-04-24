import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs/internal/observable/of';
import { EnterDataComponent } from 'src/app/enter-data/enter-data.component';
import { DataService } from 'src/app/services/data.service';

import { CancelButtonComponent } from './cancel-button.component';

@Component({
  template: `
    <ng-template #div1>Something here</ng-template>
    <ng-template #div2>Many things here</ng-template>
    <my-component [expanded]="expandedVal" [body]="div1" [handler]="div2"> </my-component>
  `,
})
class WrapperComponent {
  @ViewChild(CancelButtonComponent, { static: true }) appComponentRef: CancelButtonComponent;
  public expandedVal = true;
}

describe('CancelButtonComponent', () => {
  let component: CancelButtonComponent;
  let fixture: ComponentFixture<CancelButtonComponent>;
  let wrapperFixture: ComponentFixture<WrapperComponent>;
  let dataService;
  let modalService;
  let mockRoutes = [
    { path: 'enter-data', component: EnterDataComponent, data: { icon: 'bi-circle' } }
  ];

  const mockDataService = {
    watchItem: (item) => {
      return of({
        date: new Date(),
        parkName: 'Park Name',
        subAreaId: 'SubArea Id',
        orcs: '1234'
      })
    }
  }

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
        ModalModule.forRoot()
      ],
      declarations: [WrapperComponent, CancelButtonComponent],
      providers: [
        {
          provide: DataService, useValue: mockDataService
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    }).compileComponents();
    dataService = TestBed.inject(DataService);
    modalService = TestBed.inject(BsModalService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    wrapperFixture = TestBed.createComponent(WrapperComponent);
    modalService.show = (): BsModalRef => {
      return {
        hide: () => {}, content: { channelId: 123 }, setClass: null as any };
    };
  });

  it('should create and set nav params', async () => {
    expect(component).toBeTruthy();
    await fixture.isStable();
    fixture.detectChanges();
  });

  it('should open modal', async () => {
    component.openModal(wrapperFixture.debugElement.componentInstance);
    expect(component.modalRef).toBeTruthy();
  });

  it('should close modal and navigate to enter-data', async () => {
    component.openModal(wrapperFixture.debugElement.componentInstance);
    expect(component.modalRef).toBeTruthy();
    await component.confirm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['enter-data'], jasmine.anything());
  });

  it('should open modal and decline it', async () => {
    component.openModal(wrapperFixture.debugElement.componentInstance);
    expect(component.modalRef).toBeTruthy();
    await component.decline();
  });
});
