import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelFilterPipe } from "./hotel-search.pipe";
import { GuestSelectorComponent } from '../guest-selector/guest-selector';
import { HotelService } from '../apiService/hotel.service';
import { AuthProvider } from '../services/auth.provider';
import { SearchStateService, SearchState } from '../services/search-state.service';
import { UserService } from '../apiService/userService';
 
@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HotelFilterPipe, GuestSelectorComponent],
  templateUrl: './hotel-search.html',
  styleUrls: ['./hotel-search.css']
})
export class HotelSearch implements OnInit, OnDestroy {
  hotels:any[] = [];
  searchTerm: string = '';
  searchTriggered: boolean = false;
  showGuestSelector: boolean = false;
  guestSelectionText: string = '2 adults · 0 children · 1room';
  checkInDate: string = '';
  checkOutDate: string = '';
  dateError: string = '';
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private hotelService: HotelService, 
    private router: Router, 
    private authProvider: AuthProvider,
    private searchStateService: SearchStateService,
    private userService: UserService
  ) {}
   
  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      console.log(this.hotels);
    });
    this.restoreSearchState();
  }

  ngOnDestroy(): void {
    this.saveCurrentSearchState();
  }
 
  triggerSearch(form?: any) {
    this.dateError = '';

    if (!this.checkInDate || !this.checkOutDate) {
      this.dateError = 'Please select both check-in and check-out dates.';
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (checkIn.getTime() < today.getTime()) {
      this.dateError = 'Check-in date cannot be in the past.';
      return;
    }

    if (checkOut.getTime() <= checkIn.getTime()) {
      this.dateError = 'Check-out date must be after check-in date.';
      return;
    }

    this.searchTerm = this.searchTerm ? this.searchTerm.trim() : '';
    this.searchTriggered = true;
  }
 
  toggleGuestSelector() {
    this.showGuestSelector = !this.showGuestSelector;
  }
 
  onGuestSelectionChange(selection: any) {
    this.guestSelectionText = `${selection.adults} adults · ${selection.children} children · ${selection.rooms} room`;
     // Close selector after selection
  }
 
  closeGuestSelector() {
    this.showGuestSelector = false;
  }
 
  bookHotel(hotel: any) {
    const bookingData = {
      hotel: hotel,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      allHotels: this.hotels
    };
    console.log('Booking data prepared:', bookingData);
    
    this.saveCurrentSearchState();
    this.searchStateService.markForClearingAfterBooking();
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    this.router.navigate(['/user/booking']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  private saveCurrentSearchState(): void {
    const currentState: SearchState = {
      searchTerm: this.searchTerm,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestSelectionText: this.guestSelectionText,
      searchTriggered: this.searchTriggered,
      showGuestSelector: this.showGuestSelector
    };
    this.searchStateService.saveSearchState(currentState);
  }

  private restoreSearchState(): void {
    const savedState = this.searchStateService.getSearchState();
    if (savedState && !savedState.shouldClearAfterBooking) {
      this.searchTerm = savedState.searchTerm || '';
      this.checkInDate = savedState.checkInDate || '';
      this.checkOutDate = savedState.checkOutDate || '';
      this.guestSelectionText = savedState.guestSelectionText || '2 adults · 0 children · 1room';
      this.searchTriggered = savedState.searchTriggered || false;
      this.showGuestSelector = false;
    } else {
      this.searchTriggered = false;
      this.searchTerm = '';
      this.checkInDate = '';
      this.checkOutDate = '';
      this.guestSelectionText = '2 adults · 0 children · 1room';
      this.showGuestSelector = false;
      
      if (savedState?.shouldClearAfterBooking) {
        this.searchStateService.clearSearchState();
      }
    }
  }

  clearSearch(): void {
    this.searchStateService.clearSearchState();
    this.searchTerm = '';
    this.checkInDate = '';
    this.checkOutDate = '';
    this.guestSelectionText = '2 adults · 0 children · 1room';
    this.searchTriggered = false;
    this.showGuestSelector = false;
    this.dateError = '';
  }
}