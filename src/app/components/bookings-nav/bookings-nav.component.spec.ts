import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsNavComponent } from './bookings-nav.component';

describe('BookingsNavComponent', () => {
  let component: BookingsNavComponent;
  let fixture: ComponentFixture<BookingsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
