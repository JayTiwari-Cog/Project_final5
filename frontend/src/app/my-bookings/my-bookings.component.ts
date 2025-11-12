import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../services/auth.provider';
import { UserService } from '../apiService/userService';

interface BookingRecord {
  id: string;
  hotelName: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any = [];
  isLoggedIn = false;
  
  // Modal properties
  showFeedbackModal = false;
  selectedBooking: any = null;
  feedbackData = {
    rating: 5,
    comment: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private authProvider: AuthProvider,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      
    

    this.userService.getBookingsForUser(sessionStorage.getItem('userId') || '').subscribe({
      next: (bookings) => {
        console.log('Fetched bookings:', bookings);
        this.bookings = bookings;
      
        console.log(bookings.bookings[0].hotelId.hotelName);
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    });
  }
}

  checkLoginStatus() {
    // Check for auth token in AuthProvider (in-memory)
    const token = this.authProvider.getToken();
    this.isLoggedIn = !!token;
    console.log('My Bookings - Login status:', this.isLoggedIn, 'Has token in memory:', !!token);
  }

  goBack() {
    this.router.navigate(['/user/hotel-search']);
  }

  goToLogin() {
    this.router.navigate(['/guest-login']);
  }

  searchHotels() {
    this.router.navigate(['/user/hotel-search']);
  }

  openFeedback(booking: any) {
    this.selectedBooking = booking;
    this.showFeedbackModal = true;
    this.resetFeedbackForm();
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
    this.selectedBooking = null;
    this.resetFeedbackForm();
  }

  resetFeedbackForm() {
    this.feedbackData = {
      rating: 5,
      comment: ''
    };
  }

  setRating(rating: number) {
    this.feedbackData.rating = rating;
  }

  submitFeedback(form: any) {
    if (!this.feedbackData.comment.trim()) {
      alert('Please enter a comment before submitting feedback.');
      return;
    }

    const feedbackPayload = {
      userId: sessionStorage.getItem('userId'),
      hotelName: this.selectedBooking.hotelId.hotelName,
      rating: this.feedbackData.rating,
      comment: this.feedbackData.comment.trim()
    };

    console.log('Submitting feedback:', feedbackPayload);

    // Call your feedback service here
    this.userService.submitFeedback(feedbackPayload).subscribe({
      next: (response: any) => {
        console.log('Feedback submitted successfully:', response);
        alert('Thank you for your feedback!');
        this.closeFeedbackModal();
      },
      error: (error: any) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      }
    });
  }

  // cancelBooking(booking: BookingRecord) {
  //   if (confirm(`Are you sure you want to cancel your booking at ${booking.hotelName}?`)) {
  //     booking.status = 'cancelled';
  //     alert('Booking cancelled successfully.');
  //   }
  // }
}