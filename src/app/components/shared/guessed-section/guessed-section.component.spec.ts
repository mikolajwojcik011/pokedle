import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessedSectionComponent } from './guessed-section.component';

describe('GuessedSectionComponent', () => {
  let component: GuessedSectionComponent;
  let fixture: ComponentFixture<GuessedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessedSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
