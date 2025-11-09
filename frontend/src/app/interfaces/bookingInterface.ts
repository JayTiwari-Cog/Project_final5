export interface BookingData {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  guestDetails: { 
    adults: number;
    children: number;
    rooms: number;
  };
}