import { Injectable, inject } from '@angular/core';
import { HotelInterface } from '../interfaces/hotelInterface';
import { HotelDataService } from './hotel-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  // private hotelDataService = inject(HotelDataService);
   private GetHotelUrl='http://localhost:3000/api/hotel';
   private createGuestUrl='http://localhost:3000/api/guest';
  constructor(private httpClient:HttpClient ) {
    console.log('HotelService initialized');
  }

  // Get all hotels
  getHotels():Observable<any>  {
     return this.httpClient.get<any>(this.GetHotelUrl);
    // return this.hotelDataService.getHotels();
  }

   
createGuest(guestData:any):Observable<any>{
    console.log("Creating guest",guestData);
    return this.httpClient.post<any>(this.createGuestUrl,guestData);
  }

  
}
 
 