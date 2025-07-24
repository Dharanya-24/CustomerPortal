import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDataComponent } from './sales-order-data.component';

describe('SalesOrderDataComponent', () => {
  let component: SalesOrderDataComponent;
  let fixture: ComponentFixture<SalesOrderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOrderDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
