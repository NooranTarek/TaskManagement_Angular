import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }
  private apiUrl='http://localhost:8080/auth/'
  userSignup(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,data);
  }
}
