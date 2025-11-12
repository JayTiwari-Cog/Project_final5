import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthProvider } from './auth.provider';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthProvider);
  
 console.log('AuthInterceptor: Checking for token');
  const token =authService.getToken();
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });   
    return next(authReq);
  }
  
  return next(req);
};