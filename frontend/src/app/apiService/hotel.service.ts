import { Injectable, inject } from '@angular/core';
 
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Get all hotels with pagination
  getHotels(page: number = 1, limit: number = 10):Observable<any>  {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    return this.httpClient.get<any>(this.GetHotelUrl, { params });
    // return this.hotelDataService.getHotels();
  }

   
createGuest(guestData:any):Observable<any>{
    console.log("Creating guest",guestData);
    return this.httpClient.post<any>(this.createGuestUrl,guestData);
  }

  
}
 
 