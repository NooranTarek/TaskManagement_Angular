import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-side-bar',
  imports: [RouterLink],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent {
  name:string='';

  constructor(private route:Router,private authService:AuthService,private toastr:ToastrService){}

ngOnInit(): void {
  this.getName();
}
  logout() {
    localStorage.removeItem('Authorization');
    this.route.navigate(['/login']);
  }

  getName(){
    this.name=this.authService.getName();
  }
}
