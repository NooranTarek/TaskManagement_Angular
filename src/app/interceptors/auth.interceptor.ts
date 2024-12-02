import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =localStorage.getItem('Authorization');
  console.log("from interceptor",token);
  
  const router = inject(Router); 
  const authService = inject(AuthService);

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log('Decoded Token:', decodedToken);

      const userRole = decodedToken.role;
      const username =decodedToken.sub;
      authService.setRole(userRole);
      authService.setName(username);
      // console.log('User Role:', userRole);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
        console.error('unauthorized');

      }
      return throwError(() => error);
    })
  );};
