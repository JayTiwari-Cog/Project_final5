import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthProvider } from './services/auth.provider';
import { SearchStateService } from './services/search-state.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('smart-hotel-booking');
  userRole: 'user' | 'manager' | null = null;
  isLoggedIn = false;
  isManagerRoute = false;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private authProvider: AuthProvider,
    private searchStateService: SearchStateService
  ) {}

  ngOnInit() {
    // Check initial login state
    this.checkLoginStatus();
    
    // Listen for route changes to update login state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkLoginStatus();
      // Set manager route based on user role, not URL
      this.isManagerRoute = this.userRole === 'manager';
    });
  }

  checkLoginStatus() {
    // Check if token exists in AuthProvider (in-memory)
    const token = this.authProvider.getToken();
    const storedRole = sessionStorage.getItem('userRole');

    // User is logged in if token exists in memory
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.userRole = (storedRole === 'manager' ? 'manager' : 'user') as 'user' | 'manager';
      // Set manager route flag based on user role
      this.isManagerRoute = this.userRole === 'manager';
    } else {
      this.userRole = null;
      this.isManagerRoute = false;
    }

    console.log('Login status checked:', { isLoggedIn: this.isLoggedIn, userRole: this.userRole, isManagerRoute: this.isManagerRoute, hasTokenInMemory: !!token });
  }

  // Navigation methods
  showHome() {
    // If user is logged in, show logout confirmation
    if (this.isLoggedIn) {
      if (confirm('Do you want to logout and return to home?')) {
        this.logout();
      }
    } else {
      // If not logged in, navigate to home normally
      this.router.navigate(['/home']);
    }
  }

  showGuestLogin() {
    this.router.navigate(['/guest-login']);
  }

  showManagerLogin() {
    this.router.navigate(['/manager-login']);
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  showHotelSearch() {
    this.router.navigate(['/user/hotel-search']);
  }

  showFeedback() {
    this.router.navigate(['/user/feedback']);
  }

  showMyBookings() {
    if (this.userRole === 'manager') {
      this.router.navigate(['/manager/manage-bookings']);
    } else {
      this.router.navigate(['/user/my-bookings']);
    }
  }

  showDashboard() {
    if (this.userRole === 'manager') {
      this.router.navigate(['/manager/dashboard']);
    } else {
      this.router.navigate(['/user/hotel-search']);
    }
  }

  logout() {
    
    this.authProvider.clearToken();
    sessionStorage.removeItem('userRole');
    
  
    this.searchStateService.clearSearchState();
    
    this.authService.logout();
    this.userRole = null;
    this.isLoggedIn = false;
    this.showHome();
  }
}
