export interface Payment {
  paymentID?: string;      
  userID: string;          
  bookingID: string;        
  amount: number;          
  status?: string;          
  paymentMethod: string;    
}