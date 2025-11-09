import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container text-center mt-5">
      <div class="hero-section mb-5">
        <h1 class="display-3 text-primary fw-bold mb-4">Smart Hotel Booking</h1>
        <p class="lead fs-4 text-muted mb-5">Discover and book your perfect hotel stay with ease</p>
        
        <!-- Features Section -->
        <div class="row mb-5">
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-search text-primary fs-1 mb-3"></i>
                <h5 class="card-title">Easy Search</h5>
                <p class="card-text text-muted">Find hotels by location, price, and amenities</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-shield-check text-success fs-1 mb-3"></i>
                <h5 class="card-title">Secure Booking</h5>
                <p class="card-text text-muted">Safe and secure payment processing</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-clock text-warning fs-1 mb-3"></i>
                <h5 class="card-title">24/7 Support</h5>
                <p class="card-text text-muted">Round-the-clock customer assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="mt-5">
        <h3 class="mb-4 text-secondary">Choose Your Login Type</h3>
        <p class="text-muted mb-4">Select the appropriate login based on your role</p>
        
        <div class="row justify-content-center mb-4">
          <div class="col-md-5 mb-3">
            <div class="card h-100 border-0 shadow-sm guest-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-person-circle text-primary fs-1 mb-3"></i>
                <h5 class="card-title">Login</h5>
                <p class="card-text text-muted mb-3">Book hotels and manage your reservations</p>
                <button class="btn btn-primary btn-lg px-4 py-2" (click)="navigateToGuestLogin()">
                  <i class="bi bi-box-arrow-in-right"></i> Login
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-5 mb-3">
            <div class="card h-100 border-0 shadow-sm manager-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-shield-check text-success fs-1 mb-3"></i>
                <h5 class="card-title">Manager Login</h5>
                <p class="card-text text-muted mb-3">Access hotel management system</p>
                <button class="btn btn-success btn-lg px-4 py-2" (click)="navigateToManagerLogin()">
                  <i class="bi bi-key"></i> Manager Login
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="register-section">
          <p class="text-muted">Don't have an account?</p>
          <button class="btn btn-outline-secondary btn-lg px-4 py-2" (click)="navigateToRegister()">
            <i class="bi bi-person-plus"></i> Create New Account
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .guest-card:hover, .manager-card:hover {
      transform: translateY(-2px);
      transition: transform 0.2s;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToGuestLogin() {
    this.router.navigate(['/guest-login']);
  }

  navigateToManagerLogin() {
    this.router.navigate(['/manager-login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
