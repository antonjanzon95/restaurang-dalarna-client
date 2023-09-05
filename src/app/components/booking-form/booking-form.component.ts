import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  bookingDetails = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    date: new FormControl(new Date().toString())
  });


  onSubmit() {
    // if (this.bookingDetails.invalid) {
    //   console.log('FEL');
    //   return
    // }
    // console.log(new Date(JSON.stringify(this.bookingDetails.value.date)));
    console.log((this.bookingDetails.value.date as unknown as Date).getFullYear());
  }
}
