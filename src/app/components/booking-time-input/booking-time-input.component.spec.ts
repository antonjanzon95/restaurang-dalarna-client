import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeInputComponent } from './booking-time-input.component';

describe('BookingTimeInputComponent', () => {
  let component: BookingTimeInputComponent;
  let fixture: ComponentFixture<BookingTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTimeInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
