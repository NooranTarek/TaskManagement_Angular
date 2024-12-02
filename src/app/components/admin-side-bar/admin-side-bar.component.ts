import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-side-bar',
  imports: [],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent {
  name:string='';

  constructor(private route:Router,private userService:UserService,private toastr:ToastrService){}

ngOnInit(): void {
  this.getName();
}
  logout() {
    localStorage.removeItem('Authorization');
    this.route.navigate(['/login']);
  }

  getName(){
    this.userService.getUserName().subscribe({
      next:(response:any)=>{
        this.name=response.data;
        
      },
    error:(error:any)=>{
      this.toastr.error(error);
    }
    })
  }
}