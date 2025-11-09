import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../apiService/userService';
import { AuthProvider } from '../services/auth.provider';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private authProvider: AuthProvider, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  const token = this.authProvider.getToken();
  const role = localStorage.getItem('userRole');
  const url = state.url;

  console.log('AuthGuard: Retrieved token:', token);
  console.log('AuthGuard: Retrieved role:', role);
  console.log('AuthGuard: Attempting to access URL:', url);

  if (!token) {
    console.log('AuthGuard: No token found, redirecting to login');
    return of(this.router.createUrlTree(['/guest-login']));
  }

  // Role-based access check
  if (url.startsWith('/manager') && role !== 'manager') {
    console.log('AuthGuard: Access denied. Role is not manager.');
    return of(this.router.createUrlTree(['/user/hotel-search']));
  }

  if(url.startsWith('/user') && role !== 'user') {
    console.log('AuthGuard: Access denied. Role is not user.');
    return of(this.router.createUrlTree(['/manager/dashboard']));
  } 
  // Verify token with backend
  return this.userService.verifyToken().pipe(
    map(res => {
      if (res && res.success) {
        console.log('AuthGuard: Token verified successfully');
        return true;
      }
      console.log('AuthGuard: Token verification failed, clearing and redirecting');
      this.authProvider.clearToken();
      return this.router.createUrlTree(['/guest-login']);
    }),
    catchError(err => {
      console.log('AuthGuard: Token verification error, clearing and redirecting', err);
      this.authProvider.clearToken();
      return of(this.router.createUrlTree(['/guest-login']));
    })
  );
}
}