import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingDetails } from '../booking-details/booking-details';
import { UserService } from '../apiService/userService';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, BookingDetails, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class Booking implements OnInit {
  hotel: any;
  checkIn: string = '';
  checkOut: string = '';
  openBookingDetails: boolean = false;
  guestSelection: any = null; // Keep this - it's used for guest data
  hotelFeedback: any = null;
  
  // Feedback modal properties
  showFeedbackModal: boolean = false;
  feedbackList: any[] = [];
  loadingFeedback: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const storedBookingData = sessionStorage.getItem('bookingData');
 
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);
      this.hotel = bookingData.hotel;
      this.checkIn = bookingData.checkInDate;
      this.checkOut = bookingData.checkOutDate;
      console.log('hello',bookingData.hotel)
    }

    
    const storedGuestSelection = sessionStorage.getItem('guestSelection');
    if (storedGuestSelection) {
      this.guestSelection = JSON.parse(storedGuestSelection);
    }

    this.userService.getHotelById(this.hotel._id).subscribe({
      next: (hotelData) => {
        this.hotelFeedback = hotelData;
      },
      error: (error) => {
        console.error('Error fetching hotel by ID:', error);
      }
    });
    
    console.log('Hotel:', this.hotel);
    console.log('Guest Selection:', this.guestSelection); // Keep this for debugging
  }
 
  confirmBooking() {
    this.openBookingDetails = true;

  }
  
  goBack() {
    this.router.navigate(['/user/hotel-search']);
  }

  // Feedback modal methods
  openFeedbackModal() {
    this.showFeedbackModal = true;
    this.extractHotelFeedback();
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
  }

  extractHotelFeedback() {
    if (this.hotelFeedback && this.hotelFeedback.feedbacks) {
      this.feedbackList = this.hotelFeedback.feedbacks;
      this.loadingFeedback = false;
      console.log('Extracted feedback:', this.feedbackList);
    } else {
      console.log('No feedback data available in hotelFeedback');
      this.feedbackList = [];
      this.loadingFeedback = false;
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}