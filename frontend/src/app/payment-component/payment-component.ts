 
 
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
// import { PaymentService } from '../services/payment.service';
import { HotelService } from '../apiService/hotel.service';
import { SearchStateService } from '../services/search-state.service';
import { Payment } from '../interfaces/paymentInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelInterface } from '../interfaces/hotelInterface';
import { UserService } from '../apiService/userService';
@Component({
  selector: 'app-payment',
  templateUrl: './payment-component.html',
   imports: [CommonModule, FormsModule],
  styleUrls: ['./payment-component.css'],
  standalone: true
})
export class PaymentComponent implements OnInit {
  private hotelService = inject(HotelService);
 guestSelection: any = null;
  hotel= [];
  startDate= '';
  endDate= '';

 fullName=""
 price:number=0;
  
  @Input() selectedHotel: HotelInterface | null = null;
  @Output() close = new EventEmitter<void>();
  
  paymentMethod = 'Card';
  agreeToTerms = false;
  data = {
    userId: sessionStorage.getItem('userId'),
    hotelName: "",
    fullName: "",
    startDate: "",
    endDate: ""
  };
 
  constructor(
    // private paymentService: PaymentService, 
    private userService:UserService, 
    private router: Router,
    private searchStateService: SearchStateService
  ) {}

  ngOnInit() {
    const storedGuestSelection = sessionStorage.getItem('guestSelection');
    if (storedGuestSelection) {
      this.guestSelection = JSON.parse(storedGuestSelection);
      console.log("Guest selection found in payment component:", this.guestSelection);
    }
   const storedBookingData = sessionStorage.getItem('bookingData');

   if (storedBookingData){
    console.log("booking data found", storedBookingData);
    const bookingData = JSON.parse(storedBookingData); 
    this.hotel=bookingData.hotel;
    this.startDate=bookingData.checkInDate;
    this.endDate=bookingData.checkOutDate;

   }
   const paymentData=sessionStorage.getItem('paymentData');
    if(paymentData && storedBookingData){
      const bookingDataParsed = JSON.parse(storedBookingData);
      const paymentDataParsed = JSON.parse(paymentData);
      
      this.data = {
      userId: sessionStorage.getItem('userId'),
      hotelName: bookingDataParsed.hotel?.hotelName || '',
      fullName: paymentDataParsed.bookingData?.fullName || paymentDataParsed.fullName || '',
      startDate: this.startDate,
      endDate: this.endDate
      }


      console.log("payment data found ", this.hotel);
      this.fullName=this.data.fullName;
  }
  this.userService.getHotelByName(this.data.hotelName).subscribe({
    next: (response) => {
      console.log('Hotel details fetched successfully:', response);
      this.price = response;
    },
    error: (error) => {
      console.error('Error fetching hotel details:', error);
    }
  })
}
 

 
   closeBooking() {
    // Navigate back to hotel search when closing
    this.router.navigate(['/user/hotel-search']);
  }

  private clearAllData() {
    // Clear all session storage data
    sessionStorage.removeItem('paymentData');
    sessionStorage.removeItem('bookingData');
    sessionStorage.removeItem('guestSelection');
    
    // Clear search state (dates, location, guest selection, etc.)
    this.searchStateService.clearSearchState();
    
    console.log('All search and booking data cleared after successful payment');
  }
  
     

     
  submitPayment(form?: any) {
    if (form && form.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (!this.agreeToTerms) {
      alert('Please agree to the terms before proceeding.');
      return;
    }

    if(form.valid && this.agreeToTerms) {
      this.userService.processPayment(this.data).subscribe({
          
      next: (response) => {
        console.log('Payment processed successfully:', response);
      },
      error: (error) => {
        console.error('Error processing payment:', error);
      }
    });
  }

    alert('Payment processed successfully!');
    
    // Clear all session storage data after successful payment
    this.clearAllData();
    
    this.closeBooking();

  // @Input() userID!: string;  
  // @Input() bookingID!: string;
  // @Input() amount!: number;
  // const paymentData: Payment = {
    //   userID: this.userID,
    //   bookingID: this.bookingID,
    //   amount: this.amount,
    //   paymentMethod: this.paymentMethod
    // };


  }
}
 
 
 