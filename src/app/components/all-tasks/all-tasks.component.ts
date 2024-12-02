import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../interfaces/task';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';

@Component({
  selector: 'app-all-tasks',
  imports: [MatPaginatorModule,AdminSideBarComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent {
  tasks: Task[] = [];
  allTasks: Task[] = [];
  pageNumber:number=0;
  pageSize:number=3;
  allPages!:number;
  currentPage:number=0;
  constructor(private taskService: TaskService, private toastr: ToastrService
    , private route: Router, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks(this.pageNumber,this.pageSize).subscribe(
      (response: any) => {
        console.log("tasks", response);
        this.allTasks = response.data.content;
        // this.allPages=response.data.totalPages;        
        this.allPages=response.data.totalElements;        
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
  pageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }
}