import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  private urlApi='http://localhost:8080/tasks';
  getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.urlApi}`);

  }
}
