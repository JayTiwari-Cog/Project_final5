import { Injectable, inject } from "@angular/core";
import { RoomInterface } from "../interfaces/roomInterface";
import { LocationInterface } from "../interfaces/locationInterface";
import { HotelDataService } from "./hotel-data.service";
import { HotelInterface } from "../interfaces/hotelInterface";
@Injectable({
  providedIn: 'root'
})
export class RoomService{
  private hotelDataService = inject(HotelDataService);
  
  private locations:LocationInterface[] = [
    { name: 'Goa', emoji: '🏖️' },
    { name: 'Hyderabad', emoji: '🏰' },
    { name: 'Mumbai', emoji: '🌆' },
    { name: 'Chennai', emoji: '🌊' },
    { name: 'Kolkata', emoji: '🌉' },
    { name: 'Delhi', emoji: '🏛️' },
    { name: 'Bangalore', emoji: '🌳' },
    { name: 'Pune', emoji: '🎓' },
    { name: 'Jaipur', emoji: '🕌' },
    { name: 'Kochi', emoji: '🌴' },
    { name: 'Manali', emoji: '⛰️' }
  ];
  private roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Standard Single', 'Standard Double', 'Deluxe Single', 'Deluxe Double', 'Presidential Suite', 'Family Room', 'Business Room'];
  private hotelChains = ['Marriott', 'Park Hyatt', 'Taj', 'ITC', 'Oberoi', 'Hilton', 'Radisson', 'Leela', 'JW Marriott', 'Four Seasons'];
  
  // Available hotels for maintenance management
  private availableHotels = [
    'Grand Palace Hotel',
    'Ocean View Resort', 
    'City Center Inn',
    'Mountain Lodge',
    'Sunset Beach Hotel',
    'Downtown Business Hotel',
    'Riverside Resort',
    'Garden View Inn',
    'Metropolitan Hotel',
    'Lakeside Resort'
  ];

  // Available locations for maintenance management
  private availableMaintenanceLocations = [
    'Downtown',
    'Beachfront',
    'Business District', 
    'Mountain Area',
    'City Center',
    'Riverside',
    'Suburbs',
    'Airport Area',
    'Historic District',
    'Entertainment District'
  ];
 
  getLocations():LocationInterface[]{
    return this.locations
  }
  getRoomTypes():string[]{
    return this.roomTypes
  }
  gethotelChains():string[]{
    return this.hotelChains
  }
  getLocationEmoji(locationName: string): string {
    const location = this.locations.find(loc => loc.name === locationName);
    return location ? location.emoji : '';
  }
  addRoom(room:RoomInterface):void{
    console.log("Room Added",room);
    alert("Room added successfully")
  }

  
  addHotel(hotelData: Omit<HotelInterface, 'id'>): HotelInterface {
    return this.hotelDataService.addHotel(hotelData);
  }

  getAllHotels(): HotelInterface[] {
    return this.hotelDataService.getHotels();
  }

  getTotalHotels(): number {
    return this.hotelDataService.getHotelsCount();
  }

  // Methods for maintenance management
  getAvailableHotels(): string[] {
    return this.availableHotels;
  }

  getAvailableMaintenanceLocations(): string[] {
    return this.availableMaintenanceLocations;
  }

  // Method to add new hotels to the available list
  addAvailableHotel(hotelName: string): void {
    if (!this.availableHotels.includes(hotelName)) {
      this.availableHotels.push(hotelName);
    }
  }

  // Method to add new locations to the available list
  addAvailableLocation(location: string): void {
    if (!this.availableMaintenanceLocations.includes(location)) {
      this.availableMaintenanceLocations.push(location);
    }
  }
 
}
 
 