import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingData } from '../interfaces/bookingInterface';
 
import { HotelService } from '../apiService/hotel.service';
import { SearchStateService } from '../services/search-state.service';

@Component({
  selector: 'app-booking-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
  
})
export class BookingDetails {
 
 
  @Output() close = new EventEmitter<void>();
 
  bookingDetails: BookingData[]=[];

  constructor(private hotelService: HotelService, private searchStateService: SearchStateService, private router: Router) {}
 
 
bookingData: BookingData = {
  fullName: '',
  email: '',
  country: 'India',
  phone: '',
  guestDetails: {
    adults: sessionStorage.getItem('guestSelection') ? JSON.parse(sessionStorage.getItem('guestSelection')!).adults : 2,
    children: sessionStorage.getItem('guestSelection') ? JSON.parse(sessionStorage.getItem('guestSelection')!).children : 0,
    rooms: sessionStorage.getItem('guestSelection') ? JSON.parse(sessionStorage.getItem('guestSelection')!).rooms : 1
  }
};
 
submitForm(form: any) {
    if (form.valid) {
       this.hotelService.createGuest(this.bookingData).subscribe({
        next: (response) => {
          console.log('Guest created successfully:', response);
          
          // Store booking data for payment component
         
          sessionStorage.setItem('paymentData', JSON.stringify(this.bookingData));
          
          // Navigate to payment component
          this.router.navigate(['/user/payment']);
        },
        error: (error) => {
          console.error('Error creating guest:', error);
        }
      });
    }
  }
  closeBooking() {
    this.close.emit();
  }
}