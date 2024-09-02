import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTileComponent } from './guess-tile.component';

describe('GuessTileComponent', () => {
  let component: GuessTileComponent;
  let fixture: ComponentFixture<GuessTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
