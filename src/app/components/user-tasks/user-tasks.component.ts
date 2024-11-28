import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-user-tasks',
  imports: [SideBarComponent,RouterLink],
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


  deleteSpesificTask(id:any){
    this.taskService.deleteTask(id).subscribe(
      {
        next:(response:any)=>{
          console.log(id);
          
          console.log(response);
          
          this.toastr.success(response.message)
          this.loadTasks();
        },
        error: 
        (error)=>{
          console.log(error);
          
          this.toastr.error(error.error.message);
        }
      }
     
    )
  }
}
