import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilhouetteComponent } from './silhouette.component';

describe('SilhouetteComponent', () => {
  let component: SilhouetteComponent;
  let fixture: ComponentFixture<SilhouetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilhouetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilhouetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
