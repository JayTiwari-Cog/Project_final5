import { Injectable } from '@angular/core';

export interface ValidationResult {
  valid: boolean;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

  constructor() {
    
  }

  validateEmail(email: string): { valid: boolean; error?: string } {
    
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    if (email.length < 3 || !email.includes('@')) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    return { valid: true };
  }

  validatePassword(password: string): { valid: boolean; error?: string } {
    if (!password) {
      return { valid: false, error: 'Password is required' };
    }
    if (password.length < 3) {
      return { valid: false, error: 'Password must be at least 3 characters' };
    }
    return { valid: true };
  }

  validateLoginForm(email: string, password: string): ValidationResult {
    console.log('ValidationService: validateLoginForm() called');
    const errors: any = {};
    let valid = true;

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error;
      valid = false;
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.error;
      valid = false;
    }

    if (!valid) {
      errors.general = 'Please check your input and try again';
    }

    console.log('ValidationService: Form validation result:', { valid, errors });
    return { valid, errors };
  }
}
