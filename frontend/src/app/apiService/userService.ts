import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { AuthProvider } from "../services/auth.provider";

import { Observable,throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UserService{
    private registerUrl='http://localhost:3000/api/register'
    private loginUrl='http://localhost:3000/api/login'
    private paymentUrl='http://localhost:3000/api/test1'
    private hotelByNameUrl='http://localhost:3000/api/hotelName';
    private BookingUrl = `http://localhost:3000/api/book`;
    private feedbackUrl = 'http://localhost:3000/api/feedback';
    private getHotelByIdUrl = 'http://localhost:3000/api/hotel';
    private AddHotelUrl = 'http://localhost:3000/api/hotel';
    private getAllBookingsUrl = 'http://localhost:3000/api/bookings';
    private BookingByManagerUrl = 'http://localhost:3000/api/booking';

    private updateBookingStatusUrl = 'http://localhost:3000/api/bookings';
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
     verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:3000/api/verify', { headers });
  }

  setRole(role: string) {
    localStorage.setItem('userRole', role);
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

  getAllBookings(): Observable<any> {
    console.log("Getting all bookings for manager");
    return this.http.get<any>(this.getAllBookingsUrl);
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    console.log("Updating booking status:", bookingId, status);
    return this.http.put<any>(`http://localhost:3000/api/bookings/${bookingId}`, { status });
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
  return this.http.post('http://localhost:3000/file/download', invoiceData, { 
    responseType: 'blob' 
  });
}
} 
