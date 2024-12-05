import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) {
    this.initializeUserFromToken()
   }
  private apiUrl='http://localhost:8080/auth'
  private role!: string;
  private name!: string;
  userSignup(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,data);
  }
  userSignin(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,data);
  }


  public initializeUserFromToken(): void {
    const token = localStorage.getItem('Authorization');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.role = decodedToken.role;
        this.name = decodedToken.sub;
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    }
  }
  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }
  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

}
