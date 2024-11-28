import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  private urlApi = 'http://localhost:8080/tasks';
  getAllUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.urlApi}/userTasks`);
  }
createTask(data:any): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.urlApi}`,data);
  }
  deleteTask(id:any):Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`)
  }
}
