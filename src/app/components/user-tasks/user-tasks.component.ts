import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-tasks',
  imports: [RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  tasks:Task []=[];

  constructor(private taskService:TaskService ,private toastr: ToastrService ,private route :Router){}
  ngOnInit(): void {
    this.loadTasks(); 
  }
  
  loadTasks(): void {
    this.taskService.getAllUserTasks().subscribe(
      (response: any) => {
        console.log("tasks",response);
        this.tasks = response.data;
        this.toastr.success("your tasks showed successfully");

      },
      (error) => {
        this.toastr.error(error.error.message);
        // console.log(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.route.navigate(['/login']);
  }

  deleteSpesificTask(id:any){
    this.taskService.deleteTask(id).subscribe(
      (response:any)=>{
        console.log(id);
        
        console.log(response);
        
        this.toastr.success(response.message)
        this.loadTasks();
      },
      (error)=>{
        console.log(error);
        
        this.toastr.error(error.error.message);
      }
    )
  }
}
