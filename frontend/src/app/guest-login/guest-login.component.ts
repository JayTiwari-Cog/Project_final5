import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../apiService/userService';

@Component({
  selector: 'app-guest-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css']
})
export class GuestLoginComponent {
  private userService = inject(UserService);
  private validationService = inject(ValidationService);
  private router = inject(Router);
  
  user = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  validateEmail(): void {
    const validation = this.validationService.validateEmail(this.user.email);
    this.emailError = validation.valid ? '' : validation.error || '';
  }
  
  validatePassword(): void {
    const validation = this.validationService.validatePassword(this.user.password);
    this.passwordError = validation.valid ? '' : validation.error || '';
  }

  onSubmit(form: any): void {
  console.log('Login attempted:', this.user);

  if (form.valid) {
    this.userService.loginUser(this.user).subscribe({
      next: (response) => {
        console.log('User logged in successfully:', response);

        if (response && response.token) {
          this.userService.setToken(response.token);
          this.userService.setRole(response.role);
          this.userService.setUserId(response.userId);
          

         console.log('User ID from sessionStorage:', sessionStorage.getItem('userId'));
          switch(response.role) {
            case 'user':
              this.router.navigate(['/user/hotel-search']);
              break;
            case 'manager':
              this.router.navigate(['/manager/dashboard']);
              break;
            default:
              this.router.navigate(['/home']);
          }
        } else {
          console.warn('Login response did not contain token:', response);
          this.errorMessage = 'Login failed: No token received.';
        }

        form.reset();
        this.user = {
          email: '',
          password: ''
        };
      },
      error: (error) => {
        console.error('Error logging in user:', error);
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
      }
    });
  } else {
    this.errorMessage = 'Please fill in all required fields correctly.';
  }
}

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onShowRegister(): void {
    this.router.navigate(['/register']);
  }
}
