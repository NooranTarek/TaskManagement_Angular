import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {  
  console.log('Token in localStorage:', localStorage.getItem('Authorization'));
  const token =localStorage.getItem('Authorization');
  console.log("from interceptor",token);
  
  const router = inject(Router); 
  const authService = inject(AuthService);
  const toastr= inject(ToastrService)
  if (token) {
    authService.initializeUserFromToken();
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
        toastr.error('unauthorized');

      }
      return throwError(() => error);
    })
  );};
