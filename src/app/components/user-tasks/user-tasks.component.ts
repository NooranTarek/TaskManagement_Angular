import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-tasks',
  imports: [RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  tasks:Task []=[];

  constructor(private taskService:TaskService ,private toastr: ToastrService ){}
  ngOnInit(): void {
    this.loadTasks(); 
  }
  
  loadTasks(): void {
    this.taskService.getAllUserTasks().subscribe(
      (response: any) => {
        // console.log(response);
        this.tasks = response.data;
        this.toastr.success("your tasks showed successfully");

      },
      (error) => {
        this.toastr.error(error.error.message);
        // console.log(error);
      }
    );
  }
}
