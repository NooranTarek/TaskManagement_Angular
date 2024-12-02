import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private urlApi = 'http://localhost:8080/users';
  getUserName():Observable<any>{
    return this.http.get<any>(`${this.urlApi}/userName`)
  }
  getAllUsers(page: number, size: number): Observable<User[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<User[]>(`${this.urlApi}`, { params });
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`)
  }
}
