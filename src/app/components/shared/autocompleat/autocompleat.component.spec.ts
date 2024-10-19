import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleatComponent } from './autocompleat.component';

describe('AutocompleatComponent', () => {
  let component: AutocompleatComponent;
  let fixture: ComponentFixture<AutocompleatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
