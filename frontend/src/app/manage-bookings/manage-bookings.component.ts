import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../apiService/userService';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
  allBookings: any[] = [];
  filteredBookings: any[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  
  // Track which bookings have had actions performed (keep for session safety)
  processedBookings: Set<string> = new Set();

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAllBookings();
  }

  loadAllBookings() {
    this.loading = true;
   
    this.userService.getAllBookings().subscribe({
      next: (response: any) => {
        console.log('All bookings loaded:', response);
        this.allBookings = response.bookings || response || [];
        this.filteredBookings = [...this.allBookings];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading all bookings:', error);
        this.allBookings = [];
        this.filteredBookings = [];
        this.loading = false;
      }
    });
  }

   

  onSearchChange() {
    this.filteredBookings = this.allBookings.filter(booking => {
      const matchesSearch = !this.searchTerm || 
        booking.hotelId?.hotelName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.userId?.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.bookingId?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'all' || 
        booking.status?.toLowerCase() === this.selectedStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }

  onStatusChange() {
    this.filteredBookings = this.allBookings.filter(booking => {
      const matchesSearch = !this.searchTerm || 
        booking.hotelId?.hotelName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.userId?.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.bookingId?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' || 
        booking.status?.toLowerCase() === this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  
 

  

  

  goBack() {
    this.router.navigate(['/manager/dashboard']);
  }

  confirmBooking(booking: any) {
    if (booking.status && booking.status.toLowerCase() !== 'pending') {
      return;
    }

    if (confirm(`Are you sure you want to confirm ${booking._id}?`)) {
      booking.status = 'confirmed';
      this.processedBookings.add(booking._id);
      
      this.userService.updateBookingStatus(booking._id, 'confirmed').subscribe({
        next: (response: any) => {
          console.log('Booking status updated:', response);
          alert(`${booking._id} confirmed successfully!`);
        },
        error: (error: any) => {
          console.error('Error updating booking status:', error);
          booking.status = 'pending';
          this.processedBookings.delete(booking._id);
          alert('Failed to confirm booking. Please try again.');
        }
      });
    }
  }

  cancelBooking(booking: any) {
    if (booking.status && booking.status.toLowerCase() !== 'pending') {
      return;
    }

    if (confirm(`Are you sure you want to cancel ${booking.bookingId}?`)) {
      booking.status = 'cancelled';
      this.processedBookings.add(booking._id);
      
      this.userService.updateBookingStatus(booking._id, 'cancelled').subscribe({
        next: (response: any) => {
          console.log('Booking status updated:', response);
          alert(`${booking.bookingId} cancelled successfully!`);
        },
        error: (error: any) => {
          console.error('Error updating booking status:', error);
          booking.status = 'pending';
          this.processedBookings.delete(booking._id);
          alert('Failed to cancel booking. Please try again.');
        }
      });
    }
  }

   

 

  isBookingProcessed(booking: any): boolean {
    return booking.status && booking.status.toLowerCase() !== 'pending';
  }
}