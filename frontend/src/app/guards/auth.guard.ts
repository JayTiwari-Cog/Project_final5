import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthProvider } from '../services/auth.provider';

export const authGuard: CanActivateFn = (route, state) => {
  const authProvider = inject(AuthProvider);
  const router = inject(Router);

  const token = authProvider.getToken();
  const role = sessionStorage.getItem('userRole');
  const url = state.url;

  console.log('AuthGuard: Retrieved token:', token);
  console.log('AuthGuard: Retrieved role:', role);
  console.log('AuthGuard: Attempting to access URL:', url);

  // Check if token exists
  if (!token) {
    console.log('AuthGuard: No token found, redirecting to login');
    return router.createUrlTree(['/guest-login']);
  }

  // Role-based access check
  if (url.startsWith('/manager') && role !== 'manager') {
    console.log('AuthGuard: Access denied. Role is not manager.');
    return router.createUrlTree(['/user/hotel-search']);
  }

  if (url.startsWith('/user') && role !== 'user') {
    console.log('AuthGuard: Access denied. Role is not user.');
    return router.createUrlTree(['/manager/dashboard']);
  }

  // If token exists and role matches, allow access
  console.log('AuthGuard: Access granted');
  return true;
};