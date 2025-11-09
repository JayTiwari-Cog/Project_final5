import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'hotelFilter',
  standalone: true
})
export class HotelFilterPipe implements PipeTransform {
  transform(hotels: any[], searchTerm: string): any[] {
    if (!searchTerm) return hotels;
    return hotels.filter(hotel =>
      hotel.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
 