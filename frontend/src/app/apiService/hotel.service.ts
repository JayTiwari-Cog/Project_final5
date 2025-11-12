import { Injectable, inject } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  // private hotelDataService = inject(HotelDataService);
  private GetHotelUrl = `${environment.apiBaseUrl}/api/hotel`;
  private createGuestUrl = `${environment.apiBaseUrl}/api/guest`;
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
 
 