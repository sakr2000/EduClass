import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAssessmentDialogComponent } from './take-assessment-dialog.component';

describe('TakeAssessmentDialogComponent', () => {
  let component: TakeAssessmentDialogComponent;
  let fixture: ComponentFixture<TakeAssessmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TakeAssessmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
