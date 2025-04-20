import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllQuestionComponent } from './get-all-question.component';

describe('GetAllQuestionComponent', () => {
  let component: GetAllQuestionComponent;
  let fixture: ComponentFixture<GetAllQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
