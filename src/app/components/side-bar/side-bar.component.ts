import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  name:string='';
  constructor(private route:Router,private toastr:ToastrService,private authService:AuthService){}

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
