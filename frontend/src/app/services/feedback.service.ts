 
import { Injectable } from '@angular/core';
import { Display } from '../interfaces/display.model';
 
@Injectable({
  providedIn: 'root'  
})
export class FeedbackService {
  private reviews: Display[] = [];
 
 
  addReview(review: Display) {
    this.reviews.push(review);
  }
 
 
  getReviews(): Display[] {
    return [...this.reviews];
  }
}
 
 