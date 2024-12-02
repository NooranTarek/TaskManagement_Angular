import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-users',
  imports: [AdminSideBarComponent,MatPaginator],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  isAdmin!:boolean;
  role:string='';
  users: User[] = [];
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
    this.userService.getAllUsers(this.pageNumber,this.pageSize).subscribe(
      (response: any) => {
        this.users = response.data.content;
        console.log("users",this.users);
        
        this.allPages=response.data.totalElements;        
        this.toastr.success("users showed successfully");

      },
      (error) => {
        if (error.error.message == "Token EXPIRED") {
          this.toastr.error(error.error.message);
          this.route.navigate(['/login']);
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

}
