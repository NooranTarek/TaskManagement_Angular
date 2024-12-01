import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { FilterDataComponent } from '../filter-data/filter-data.component';

@Component({
  selector: 'app-user-tasks',
  imports: [SideBarComponent,FilterDataComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  tasks: Task[] = [];
  allTasks: Task[] = [];

  constructor(private taskService: TaskService, private toastr: ToastrService
    , private route: Router, private router: ActivatedRoute,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadTasks();
  }

  openUpdateDialog(task: any): void {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }
  loadTasks(): void {
    this.taskService.getAllUserTasks().subscribe(
      (response: any) => {
        console.log("tasks", response);
        this.allTasks = response.data;
        this.tasks=[...this.allTasks];
        this.toastr.success("your tasks showed successfully");

      },
      (error) => {
        if (error.error.message == "Token EXPIRED") {
          this.toastr.error(error.error.message);
          this.route.navigate(['/login']);
        }
        // console.log(error);
      }
    );
  }


  deleteSpesificTask(id: any) {
    this.taskService.deleteTask(id).subscribe(
      {
        next: (response: any) => {
          console.log(id);

          console.log(response);

          this.toastr.success(response.message)
          this.loadTasks();
        },
        error:
          (error) => {
            console.log(error);

            this.toastr.error(error.error.message);
          }
      }

    )
  }
  updateFilteredItems(filtered: any[]) {
    this.tasks = filtered;
    console.log("filtered data",this.tasks);

  }

}
