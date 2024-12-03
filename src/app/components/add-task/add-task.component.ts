import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Periority, Status, Task } from '../../interfaces/task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AuthService } from '../../services/auth.service';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule,SideBarComponent,AdminSideBarComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  isAdmin!:boolean;
  role:string='';
  task:Task []=[];
  add_task_form!:FormGroup;
  periorityOptions = Object.values(Periority);
  statusOptions = Object.values(Status);

  constructor
  (private taskService:TaskService,
  private route:Router,
  private toastr: ToastrService,
  private authService:AuthService){
  this.add_task_form=new FormGroup({
   title:new FormControl(null,[Validators.required,Validators.minLength(3)]),
   description:new FormControl(null,[Validators.required,Validators.minLength(3)]),
   periority:new FormControl(null,Validators.required),
   status:new FormControl(null,Validators.required),
   dueDate: new FormControl(null)
  })
}
ngOnInit(): void {
  this.getRole();
}
onSubmit(){
if (this.add_task_form.valid){
  const formData=this.add_task_form.value;
  this.taskService.createTask(formData).subscribe({
    next:(response:any)=>{
      // console.log(response);
      if (response){
        this.toastr.success("task added successfully");
        this.route.navigate(['/user-tasks']);
      }
    },
    error:(error: HttpErrorResponse) => {
      if(error.error.message=="Token EXPIRED"){
        this.toastr.error(error.error.message);
        this.route.navigate(['/login']);
      }      // console.clear();
    }
    
  })
}
}
getRole(){
  this.role=this.authService.getRole();
  console.log("role",this.role);
  if(this.role=="admin"){
        
    this.isAdmin=true;
  }
  else{
    this.isAdmin=false;
  }
}
  }

