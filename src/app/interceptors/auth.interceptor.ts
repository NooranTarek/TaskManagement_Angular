import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =localStorage.getItem('Authorization');
  console.log("from interceptor",token);
  
  const router = inject(Router); 
  if (token) {
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
