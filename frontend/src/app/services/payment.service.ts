import { Injectable } from '@angular/core';
 
import { Payment } from '../interfaces/paymentInterface';
 
 
@Injectable({ providedIn: 'root' })
export class PaymentService {
 
 submitPayment(payment: Payment) {
   console.log('Payment submitted:', payment);
  }
}