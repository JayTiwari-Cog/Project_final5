import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  // Base prices for different room types
  private roomTypePrices: { [key: string]: number } = {
    'Single': 1500,
    'Double': 2500,
    'Suite': 4500,
    'Deluxe': 3500,
    'Executive': 5500,
    'Presidential Suite': 8500
  };

  // Location multipliers
  private locationMultipliers: { [key: string]: number } = {
    'Mumbai': 1.5,
    'Delhi': 1.4,
    'Bangalore': 1.3,
    'Kolkata': 1.2,
    'Chennai': 1.2,
    'Hyderabad': 1.1,
    'Pune': 1.1,
    'Ahmedabad': 1.0,
    'Jaipur': 0.9,
    'Goa': 1.6,
    'Kochi': 1.0,
    'Coimbatore': 0.8
  };

  // Hotel chain multipliers
  private hotelChainMultipliers: { [key: string]: number } = {
    'Taj Hotels': 2.0,
    'Oberoi Hotels': 1.9,
    'ITC Hotels': 1.8,
    'Leela Palaces': 1.7,
    'Hyatt Hotels': 1.6,
    'Marriott Hotels': 1.5,
    'Hilton Hotels': 1.4,
    'Radisson Hotels': 1.3,
    'Accor Hotels': 1.2,
    'Lemon Tree Hotels': 1.0,
    'Ginger Hotels': 0.8,
    'OYO Hotels': 0.6
  };

  // Amenity prices (additional cost)
  private amenityPrices: { [key: string]: number } = {
    'wifi': 200,
    'breakfast': 500,
    'roomService': 300,
    'iron': 100,
    'pool': 400
  };

  constructor() { }

  /**
   * Calculate total price based on selected options
   */
  calculatePrice(
    roomType: string,
    location: string,
    hotelChain: string,
    amenities: { [key: string]: boolean }
  ): number {
    // Get base price for room type
    const basePrice = this.roomTypePrices[roomType] || 2000;
    
    // Get location multiplier
    const locationMultiplier = this.locationMultipliers[location] || 1.0;
    
    // Get hotel chain multiplier
    const hotelMultiplier = this.hotelChainMultipliers[hotelChain] || 1.0;
    
    // Calculate base cost with multipliers
    let totalPrice = basePrice * locationMultiplier * hotelMultiplier;
    
    // Add amenity costs
    let amenityCost = 0;
    for (const [amenity, isSelected] of Object.entries(amenities)) {
      if (isSelected && this.amenityPrices[amenity]) {
        amenityCost += this.amenityPrices[amenity];
      }
    }
    
    totalPrice += amenityCost;
    
    // Round to nearest 50
    return Math.round(totalPrice / 50) * 50;
  }

 
  getPriceBreakdown(
    roomType: string,
    location: string,
    hotelChain: string,
    amenities: { [key: string]: boolean }
  ): {
    basePrice: number,
    locationMultiplier: number,
    hotelMultiplier: number,
    amenityCost: number,
    totalPrice: number
  } {
    const basePrice = this.roomTypePrices[roomType] || 2000;
    const locationMultiplier = this.locationMultipliers[location] || 1.0;
    const hotelMultiplier = this.hotelChainMultipliers[hotelChain] || 1.0;
    
    let amenityCost = 0;
    for (const [amenity, isSelected] of Object.entries(amenities)) {
      if (isSelected && this.amenityPrices[amenity]) {
        amenityCost += this.amenityPrices[amenity];
      }
    }
    
    const totalPrice = this.calculatePrice(roomType, location, hotelChain, amenities);
    
    return {
      basePrice,
      locationMultiplier,
      hotelMultiplier,
      amenityCost,
      totalPrice
    };
  }

 
  getRoomTypePrices(): { [key: string]: number } {
    return { ...this.roomTypePrices };
  }

  getLocationMultipliers(): { [key: string]: number } {
    return { ...this.locationMultipliers };
  }

  getHotelChainMultipliers(): { [key: string]: number } {
    return { ...this.hotelChainMultipliers };
  }

  
  getAmenityPrices(): { [key: string]: number } {
    return { ...this.amenityPrices };
  }
}
