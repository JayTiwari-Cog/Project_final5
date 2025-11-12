import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthProvider } from "../services/auth.provider";
import { environment } from '../../environments/environment';

import { Observable,throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UserService{
  private baseUrl = environment.apiBaseUrl;
  private registerUrl = `${this.baseUrl}/api/register`;
  private loginUrl = `${this.baseUrl}/api/login`;
  private paymentUrl = `${this.baseUrl}/api/createBook`;
  private hotelByNameUrl = `${this.baseUrl}/api/hotelName`;
  private BookingUrl = `${this.baseUrl}/api/book`;
  private feedbackUrl = `${this.baseUrl}/api/feedback`;
  private getHotelByIdUrl = `${this.baseUrl}/api/hotel`;
  private AddHotelUrl = `${this.baseUrl}/api/hotel`;
  private getAllBookingsUrl = `${this.baseUrl}/api/bookings`;
  private BookingByManagerUrl = `${this.baseUrl}/api/booking`;

  private updateBookingStatusUrl = `${this.baseUrl}/api/bookings`;
    constructor(private http:HttpClient, private authProvider: AuthProvider){}
     registerUser(userData:any):Observable<any>{
        console.log("Registering user",userData);
        return this.http.post<any>(this.registerUrl,userData);
     }

      setToken(token: string) {
        console.log('Setting auth token:', token);
        this.authProvider.setToken(token);
    }

    getToken(): string | null {
      return this.authProvider.getToken();
    }

     loginUser(loginData:any):Observable<any>{
       
        console.log("Logging in user",loginData);
        return this.http.post<any>(this.loginUrl,loginData);
     }
  //    verifyToken(): Observable<any> {
  //   const token = this.getToken();
  //   if (!token) {
  //     return throwError(() => new Error('No token found'));
  //   }
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any>(`${this.baseUrl}/api/verify`, { headers });
  // }

  setRole(role: string) {
    sessionStorage.setItem('userRole', role);
  }
  setUserId(userId: string) {
     this.authProvider.setUserId(userId);
  }

  processPayment(paymentData:any):Observable<any>{
    console.log("Processing payment",paymentData);
    return this.http.post<any>(this.paymentUrl,paymentData);
  }
  getHotelByName(hotelName: any): Observable<any> {

    return this.http.post<any>(this.hotelByNameUrl, { hotelName });
  }
  getBookingsForUser(userId: string): Observable<any> {
     console.log("Fetching bookings for user:", userId);
  return this.http.post<any>(this.BookingUrl, { userId });
  }

  submitFeedback(feedbackData: any): Observable<any> {
    console.log("Submitting feedback:", feedbackData);
    return this.http.post<any>(this.feedbackUrl, feedbackData);
  }

  getHotelById(hotelId: string): Observable<any> {
    return this.http.get<any>(`${this.getHotelByIdUrl}/${hotelId}`);
  }

  getAllBookings(page:number,limit:number): Observable<any> {

    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<any>(this.getAllBookingsUrl, { params });
    // console.log("Getting all bookings for manager");
    // return this.http.get<any>(this.getAllBookingsUrl);
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    console.log("Updating booking status:", bookingId, status);
    return this.http.put<any>(`${this.updateBookingStatusUrl}/${bookingId}`, { status });
  }

   

  addHotel(hotelData: any): Observable<any> {
    console.log("Adding new hotel:", hotelData);
    return this.http.post<any>(this.AddHotelUrl, hotelData);
  }

  createBookingByManager(bookingData: any): Observable<any> {
    console.log("Creating booking by manager:", bookingData);
    return this.http.post<any>(this.BookingByManagerUrl, bookingData);
  }
  downloadInvoice(invoiceData: any): Observable<Blob> {
    console.log("Downloading invoice with data:", invoiceData);
  return this.http.post(`${this.baseUrl}/file/download`, invoiceData, { 
    responseType: 'blob' 
  });
}
} 
