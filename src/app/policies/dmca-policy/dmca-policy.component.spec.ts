import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaPolicyComponent } from './dmca-policy.component';

describe('DmcaPolicyComponent', () => {
  let component: DmcaPolicyComponent;
  let fixture: ComponentFixture<DmcaPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmcaPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmcaPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
