import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {


  constructor(private route:Router){}


  logout() {
    localStorage.removeItem('Authorization');
    this.route.navigate(['/login']);
  }
}
