import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  private urlApi = 'http://localhost:8080/tasks';
  getAllUserTasks(page: number, size: number): Observable<Task[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Task[]>(`${this.urlApi}/userTasks`, { params });
  }
  
createTask(data:any): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.urlApi}`,data);
  }
  deleteTask(id:any):Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`)
  }
  updateTask(id:any,data:any):Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${id}`,data)
  }
  findTaskById(id:any):Observable<Task>{
    return this.http.get<Task>(`${this.urlApi}/${id}`);
  }
}
