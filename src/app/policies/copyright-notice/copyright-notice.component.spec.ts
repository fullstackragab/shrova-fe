import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightNoticeComponent } from './copyright-notice.component';

describe('CopyrightNoticeComponent', () => {
  let component: CopyrightNoticeComponent;
  let fixture: ComponentFixture<CopyrightNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightNoticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyrightNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
