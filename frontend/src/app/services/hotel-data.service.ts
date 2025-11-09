import { Injectable } from '@angular/core';
import { HotelInterface } from '../interfaces/hotelInterface';

@Injectable({
  providedIn: 'root'
})
export class HotelDataService {
  
  // Simple hotel data array
  private hotels: HotelInterface[] = [
    { _id: 1, hotelName: 'Ocean View Resort', location: 'Goa', price: 4500, rating: 4.5 },
    { _id: 2, hotelName: 'Mountain Escape Lodge', location: 'Manali', price: 3200, rating: 4.2 },
    { _id: 3, hotelName: 'City Central Inn', location: 'Mumbai', price: 2800, rating: 3.9 },
    { _id: 4, hotelName: 'Taj Palace', location: 'Delhi', price: 6500, rating: 4.8 },
    { _id: 5, hotelName: 'ITC Grand Bharat', location: 'Hyderabad', price: 5500, rating: 4.6 },
    { _id: 6, hotelName: 'Park Hyatt Chennai', location: 'Chennai', price: 5800, rating: 4.7 },
    { _id: 7, hotelName: 'Oberoi Grand', location: 'Kolkata', price: 5200, rating: 4.5 },
    { _id: 8, hotelName: 'JW Marriott', location: 'Bangalore', price: 4800, rating: 4.4 },
    { _id: 9, hotelName: 'Leela Palace', location: 'Pune', price: 4200, rating: 4.3 },
    { _id: 10, hotelName: 'Four Seasons', location: 'Jaipur', price: 5900, rating: 4.8 },
    { _id: 11, hotelName: 'Hilton Garden Inn', location: 'Kochi', price: 3800, rating: 4.1 },
    { _id: 12, hotelName: 'Radisson Blu', location: 'Goa', price: 4100, rating: 4.2 }
  ];

  constructor() {
    console.log('HotelDataService initialized');
  }

  // Get all hotels
  getHotels(): HotelInterface[] {
    return this.hotels;
  }

  // Get hotel by ID
  getHotelById(id: number): HotelInterface | undefined {
    return this.hotels.find(hotel => hotel._id === id);
  }

  // Search hotels by name or location
  searchHotels(searchTerm: string): HotelInterface[] {
    if (!searchTerm) return this.hotels;
    
    const term = searchTerm.toLowerCase();
    return this.hotels.filter(hotel => 
      hotel.hotelName.toLowerCase().includes(term) || 
      hotel.location.toLowerCase().includes(term)
    );
  }

  // Get unique locations
  getUniqueLocations(): string[] {
    return [...new Set(this.hotels.map(hotel => hotel.location))].sort();
  }

  // Add a new hotel
  addHotel(hotel: Omit<HotelInterface, 'id'>): HotelInterface {
    const newId = this.hotels.length > 0 ? Math.max(...this.hotels.map(h => h._id)) + 1 : 1;
    const newHotel: HotelInterface = { ...hotel, _id: newId };
    
    this.hotels.push(newHotel);
    console.log('New hotel added:', newHotel.hotelName);
    return newHotel;
  }

  // Get hotels count
  getHotelsCount(): number {
    return this.hotels.length;
  }
}
