import { Injectable } from '@angular/core';

export interface UserBookingData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
  hotelName: string;
  roomType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManagerAddUserService {
  private bookings: UserBookingData[] = [];

  // Dropdown options
  public readonly locations = [
    'Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Kochi'
  ];

  public readonly hotels = [
    'Marriott', 'Taj', 'Park Hyatt', 'ITC', 'Oberoi', 
    'Hilton', 'Radisson', 'Leela', 'JW Marriott', 'Four Seasons'
  ];

  public readonly roomTypes = [
    'Single Room', 'Double Room', 'Deluxe Room', 'Suite', 
    'Executive Suite', 'Presidential Suite'
  ];

  constructor() {
    console.log('ManagerAddUserService initialized');
  }

  // Create a new booking
  createUserBooking(userData: UserBookingData): string {
    const bookingId = 'BK' + Date.now();
    this.bookings.push(userData);
    console.log('Booking created:', bookingId);
    return bookingId;
  }

  // Get all bookings
  getAllBookings(): UserBookingData[] {
    return this.bookings;
  }

  // Get today's date
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Calculate nights between dates
  calculateNumberOfNights(checkInDate: string, checkOutDate: string): number {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return checkOut > checkIn ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  }
}
