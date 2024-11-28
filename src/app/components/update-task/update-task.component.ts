import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Periority, Status, Task } from '../../interfaces/task';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  imports: [SideBarComponent,ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  taskId!:Number;
  taskInfo!:Task;
  taskForm!:FormGroup;
  periorityOptions = Object.values(Periority);
  statusOptions = Object.values(Status);
  constructor(private router:Router,private route:ActivatedRoute, private taskService:TaskService,private toastr:ToastrService,private fb:FormBuilder){}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: [null, [Validators.required]],
      periority: [null, [Validators.required]],
      dueDate: [null, [Validators.required]]
    });

    this.taskId=Number(this.route.snapshot.paramMap.get('id'));
this.taskData()    
  }

  taskData(){
    this.taskService.findTaskById(this.taskId).subscribe({
      next:(response:any)=>{
        this.taskInfo=response.data;
        this.taskForm.patchValue(this.taskInfo);
      },
      error:
      (error:any)=>{
       this.toastr.error(error);
      }
    }
      
    )
  }
  updateTaskData(){
    this.taskService.updateTask(this.taskId,this.taskForm.value).subscribe({
      next:(response:any)=>{
        console.log(response);
        
        this.toastr.success("Task Updated Succcessfully");
        this.router.navigate(['/user-tasks']);

      },
      error:
      (error:any)=>{
        console.log(error);
        
       this.toastr.error(error);
      }
    }
      
    )
  }
}
