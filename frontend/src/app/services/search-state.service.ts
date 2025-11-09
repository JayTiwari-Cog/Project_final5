import { Injectable } from '@angular/core';

export interface SearchState {
  searchTerm: string;
  checkInDate: string;
  checkOutDate: string;
  guestSelectionText: string;
  searchTriggered: boolean;
  showGuestSelector: boolean;
  shouldClearAfterBooking?: boolean;
  guestSelection?: {
    adults: number;
    children: number;
    rooms: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private readonly STORAGE_KEY = 'hotelSearchState';

  constructor() { }

  saveSearchState(state: SearchState): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  getSearchState(): SearchState | null {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  clearSearchState(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  markForClearingAfterBooking(): void {
    const currentState = this.getSearchState();
    if (currentState) {
      currentState.shouldClearAfterBooking = true;
      this.saveSearchState(currentState);
    }
  }

  hasSearchState(): boolean {
    return sessionStorage.getItem(this.STORAGE_KEY) !== null;
  }
}