import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewHotelInterface } from '../interfaces/newHotelInterface';
import { UserService } from '../apiService/userService';
@Component({
  selector: 'app-manager-add-hotel',
  templateUrl: './manager-add-hotel.html',
  styleUrls: ['./manager-add-hotel.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManagerAddHotelComponent implements OnInit {
  @Output() homeRequested = new EventEmitter<void>();
  
  // Available room types based on schema
  availableRoomTypes: string[] = ["Single", "Double", "Deluxe", "Twin", "Suite"];
  
  // Available amenities based on schema
  availableAmenities: string[] = ['WiFi', 'Parking', 'Swimming Pool', 'Gym', 'Restaurant'];
 
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Initialize form values
    this.resetForm();
  }
 
  // Hotel form data
  hotel: NewHotelInterface = {
    hotelName: '',
    roomType: [],
    amenities: [],
    address: {
      street: '',
      city: '',
      postalCode: ''
    },
    pricePerNight: 0
  };

  // Track selected room types and amenities
  selectedRoomTypes: { [key: string]: boolean } = {};
  selectedAmenities: { [key: string]: boolean } = {};
 
  submittedHotel: NewHotelInterface | null = null;
 
  // Handle room type selection
  onRoomTypeChange(roomType: string): void {
    if (this.selectedRoomTypes[roomType]) {
      // Add to hotel roomType array if selected
      if (!this.hotel.roomType.includes(roomType)) {
        this.hotel.roomType.push(roomType);
      }
    } else {
      // Remove from hotel roomType array if unselected
      this.hotel.roomType = this.hotel.roomType.filter(type => type !== roomType);
    }
  }

  // Handle amenity selection
  onAmenityChange(amenity: string): void {
    if (this.selectedAmenities[amenity]) {
      // Add to hotel amenities array if selected
      if (!this.hotel.amenities.includes(amenity)) {
        this.hotel.amenities.push(amenity);
      }
    } else {
      // Remove from hotel amenities array if unselected
      this.hotel.amenities = this.hotel.amenities.filter(item => item !== amenity);
    }
  }

  // Validate postal code format (6 digits)
  validatePostalCode(): boolean {
    const postalCodePattern = /^[0-9]{6}$/;
    return postalCodePattern.test(this.hotel.address.postalCode);
  }

  // Submit hotel form
  submitHotel(form?: any): void {
    if (form && form.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    // Validate required fields
    if (!this.hotel.hotelName.trim()) {
      alert('Hotel name is required.');
      return;
    }

    if (this.hotel.roomType.length === 0) {
      alert('Please select at least one room type.');
      return;
    }

    if (this.hotel.amenities.length === 0) {
      alert('Please select at least one amenity.');
      return;
    }

    if (!this.hotel.address.street.trim() || !this.hotel.address.city.trim() || !this.hotel.address.postalCode.trim()) {
      alert('Please fill all address fields.');
      return;
    }

    if (!this.validatePostalCode()) {
      alert('Please enter a valid 6-digit postal code.');
      return;
    }

    if (this.hotel.pricePerNight <= 0) {
      alert('Price per night must be greater than 0.');
      return;
    }

    // Call API to add hotel
    this.userService.addHotel(this.hotel).subscribe({
      next: (response) => {
        this.submittedHotel = { ...this.hotel };
        alert('Hotel added successfully!');
        this.resetForm();
        if (form) form.resetForm();
      },
      error: (error) => {
        console.error('Error adding hotel:', error);
        alert('Error adding hotel. Please try again.');
      }
    });
  }
 
  resetForm(): void {
    this.hotel = {
      hotelName: '',
      roomType: [],
      amenities: [],
      address: {
        street: '',
        city: '',
        postalCode: ''
      },
      pricePerNight: 0
    };
    
    // Reset selection tracking
    this.selectedRoomTypes = {};
    this.selectedAmenities = {};
    this.availableRoomTypes.forEach(type => this.selectedRoomTypes[type] = false);
    this.availableAmenities.forEach(amenity => this.selectedAmenities[amenity] = false);
  }

  goHome() {
    this.homeRequested.emit();
  }

  goBackToDashboard() {
    this.router.navigate(['/manager/dashboard']);
  }
}
 
 
 
 
 