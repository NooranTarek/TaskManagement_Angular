import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { AuthService } from '../../services/auth.service';
import { FilterDataComponent } from '../filter-data/filter-data.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  imports: [AdminSideBarComponent,MatPaginator,FilterDataComponent],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  isAdmin!:boolean;
  role:string='';
  users: User[] = [];
  allUsers:User[]=[];
  pageNumber:number=0;
  pageSize:number=3;
  allPages!:number;
  currentPage:number=0;
  constructor(private userService: UserService, private toastr: ToastrService
    , private route: Router, private router: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers(this.pageNumber,this.pageSize).subscribe({
      next:  (response: any) => {
        this.allUsers = response.data.content;
        this.users=[...this.allUsers];
        console.log("users",this.users);
        
        this.allPages=response.data.totalElements;        
        this.toastr.success("users showed successfully");

      },error:(error) => {
        this.toastr.error(error.error.message);
      }
    }
    
    );
  }
  pageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
  deleteSpesificUser(id:any){
    this.userService.deleteUser(id).subscribe({
      next:(response:any)=>{
        this.toastr.success("user deleted successfully");
        this.loadUsers;
      },
      error:(error:any)=>{
        this.toastr.error(error);
      }
    })
  }

  updateFilteredItems(Filtered:any[]){
    this.users=Filtered;
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
        this.deleteSpesificUser(id);
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }
}
