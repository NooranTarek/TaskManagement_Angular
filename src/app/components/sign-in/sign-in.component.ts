import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signinForm!:FormGroup;

  constructor
    (private authService:AuthService,
    private route:Router,
    private toastr: ToastrService){
  
  }
  ngOnInit(){
    this.signinForm=new FormGroup({
    
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
     })
  }
  onSubmit(){
    // console.log("hello from submit");
    // console.log(this.signinForm.valid);
    
  if (this.signinForm.valid){
    const formData=this.signinForm.value;
    this.authService.userSignin(formData).subscribe({
      next:(response:any)=>{
        if (response){
          // console.log("hello");
          
          // console.log(response);
          localStorage.setItem('Authorization', response.data);
          this.toastr.success("user logged in successfully");
          this.route.navigate(['/add-task']);
        }
      },
      error:(error: any
      ) => {
        // console.log(error)
        this.toastr.error(error.error.message);
        // console.clear();
      }
      
    })
  }else {
    this.toastr.error("this form is invalid")
  }
  }
}
