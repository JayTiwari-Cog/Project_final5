import { Injectable, inject } from '@angular/core';
import { ValidationService, ValidationResult } from './validation.service';
import { SearchStateService } from './search-state.service';

export interface LoginResult {
  success: boolean;
  message?: string;
  showRoleSelection?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any = null;
  private validationService = inject(ValidationService);
  private searchStateService = inject(SearchStateService);

  constructor() {
    // Check for existing login state in localStorage
    this.loadLoginState();
  }

  private loadLoginState(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedLoginStatus === 'true' && storedUser) {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(storedUser);
    }
  }

  private saveLoginState(): void {
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  private clearLoginState(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  processLogin(email: string, password: string): LoginResult {
    console.log('AuthService: processLogin() called with email:', email);
    
     
    const validation: ValidationResult = this.validationService.validateLoginForm(email, password);
    
    if (!validation.valid) {
      console.log('AuthService: Login validation failed:', validation.errors);
      return {
        success: false,
        message: validation.errors.general || 'Validation failed'
      };
    }

    
    const loginSuccess = this.login(email, password);
    
    if (loginSuccess) {
      return {
        success: true,
        showRoleSelection: true,
        message: 'Login successful'
      };
    } else {
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }
 

 
  login(email: string, password: string): boolean {
    if (email && password) {
      this.isLoggedIn = true;
      this.currentUser = { email };
      this.saveLoginState();
      return true;
    }
    console.log('AuthService: Login failed - missing email or password');
    return false;
  }
 

  isAuthenticated(): boolean {
    console.log('AuthService: isAuthenticated() called, result:', this.isLoggedIn);
    return this.isLoggedIn;
  }

  getCurrentUser(): any {
    console.log('AuthService: getCurrentUser() called, current user:', this.currentUser);
    return this.currentUser;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.clearLoginState();
    
    // Clear search state on logout
    this.searchStateService.clearSearchState();
    
    console.log('AuthService: User logged out and search state cleared');
  }
}
