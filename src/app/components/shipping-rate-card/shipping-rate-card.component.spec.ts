import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingRateCardComponent } from './shipping-rate-card.component';

describe('ShippingRateCardComponent', () => {
  let component: ShippingRateCardComponent;
  let fixture: ComponentFixture<ShippingRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingRateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
