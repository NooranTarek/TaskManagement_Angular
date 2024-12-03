import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { FilterDataComponent } from '../filter-data/filter-data.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-tasks',
  imports: [SideBarComponent,FilterDataComponent,MatPaginatorModule,AdminSideBarComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  isAdmin!:boolean;
  role:string='';
  tasks: Task[] = [];
  allTasks: Task[] = [];
  pageNumber:number=0;
  pageSize:number=3;
  allPages!:number;
  currentPage:number=0;
  constructor(private taskService: TaskService, private toastr: ToastrService
    , private route: Router, private router: ActivatedRoute,
    private dialog: MatDialog,
    private authService:AuthService) { }
  ngOnInit(): void {
    this.getRole();
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
    this.taskService.getAllUserTasks(this.pageNumber,this.pageSize).subscribe({
      next: (response: any) => {
        console.log("tasks", response);
        this.allTasks = response.data.content;
        // this.allPages=response.data.totalPages;        
        this.allPages=response.data.totalElements;        
        this.tasks=[...this.allTasks];
        this.toastr.success("your tasks showed successfully");

      },error:
      (error) => {
        if (error.error.message == "Token EXPIRED") {
          this.toastr.error(error.error.message);
          this.route.navigate(['/login']);
        }
        this.toastr.error(error.error.message);
      }
    }
      
    );
  }


  deleteSpesificTask(id: any) {
    this.taskService.deleteTask(id).subscribe(
      {
        next: (response: any) => {
          // console.log(id);
          // console.log(response);
          this.toastr.success(response.message)
          this.loadTasks();
        },
        error:
          (error) => {
            // console.log(error);
            this.toastr.error(error.error.message);
          }
      }

    )
  }
  updateFilteredItems(filtered: any[]) {
    this.tasks = filtered;
    // console.log("filtered data",this.tasks);

  }
  // onPageChange(newPage:number){
  //   this.pageNumber=newPage;
  //   this.loadTasks();
  // }
  pageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
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
confirmAction(id:any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteSpesificTask(id);
      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
    }
  });
}

}