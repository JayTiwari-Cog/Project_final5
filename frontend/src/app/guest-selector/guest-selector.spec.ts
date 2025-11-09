import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSelectorComponent } from './guest-selector';

describe('GuestSelectorComponent', () => {
  let component: GuestSelectorComponent;
  let fixture: ComponentFixture<GuestSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
