import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyButtonsComponent } from './buy-buttons.component';

describe('BuyButtonsComponent', () => {
  let component: BuyButtonsComponent;
  let fixture: ComponentFixture<BuyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
