import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private urlApi = 'http://localhost:8080/users';
  getUserName():Observable<any>{
    return this.http.get<any>(`${this.urlApi}/userName`)
  }
}
