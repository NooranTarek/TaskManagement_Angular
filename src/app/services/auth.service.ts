import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }
  private apiUrl='http://localhost:8080/auth'
  private role!: string;
  userSignup(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,data);
  }
  userSignin(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,data);
  }

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }

}
