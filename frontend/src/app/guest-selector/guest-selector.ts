import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
export interface GuestSelection {
  adults: number;
  children: number;
  rooms: number;
}
 
@Component({
  selector: 'app-guest-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-selector.html',
  styleUrls: ['./guest-selector.css']
})
export class GuestSelectorComponent {
  @Input() isVisible: boolean = false;
  @Output() selectionChange = new EventEmitter<GuestSelection>();
  @Output() close = new EventEmitter<void>();
 
  selection: GuestSelection = {
    
    adults: 2,
    children: 0,
    rooms: 1
  };

  
 
  increment(type: 'adults' | 'children' | 'rooms'): void {
    if (this.selection[type] < 10) {
      this.selection[type]++;
      this.emitChange();
    }
   
  }
 
  decrement(type: 'adults' | 'children' | 'rooms'): void {
    if (this.selection[type] > (type === 'adults' ? 1 : 0)) {
      this.selection[type]--;
      this.emitChange();
    }
    
  }
 
  private emitChange(): void {
    sessionStorage.setItem('guestSelection', JSON.stringify(this.selection));
    this.selectionChange.emit(this.selection);
  }
 
  closeSelector(): void {
    this.close.emit();
  }
   

 
  
}