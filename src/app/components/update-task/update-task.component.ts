import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Periority, Status, Task } from '../../interfaces/task';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  taskId!: Number;
  taskInfo!: Task;
  taskForm!: FormGroup;
  periorityOptions = Object.values(Periority);
  statusOptions = Object.values(Status);
  constructor(private router: Router, private route: ActivatedRoute, 
    private taskService: TaskService, private toastr: ToastrService,
     private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<UpdateTaskComponent>,
    ) {   
    }

    ngOnInit(): void {
      this.taskForm = this.fb.group({
        title: [this.data.task.title, [Validators.required]],
        description: [this.data.task.description, [Validators.required]],
        status: [this.data.task.status, [Validators.required]],
        periority: [this.data.task.periority, [Validators.required]],
        dueDate: [this.data.task.dueDate, [Validators.required]],
      });
      console.log("Form initialized:", this.taskForm.value);

    }
    

  

  updateTaskData() {
    this.taskService.updateTask(this.data.task.id, this.taskForm.value).subscribe(
      {
        next: (response: any) => {
          console.log(response);

          this.toastr.success("Task Updated Succcessfully");
          this.dialogRef.close(true);

        },
        error:(error) => {
        if (error.error.message == "Token EXPIRED") {
          this.toastr.error(error.error.message);
          this.router.navigate(['/login']);
        }
        this.toastr.error(error.error.message);
      }
      }

    )
  }
}
