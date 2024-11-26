import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class SignInComponent {
  signinForm:FormGroup;

  constructor
    (private authService:AuthService,
    private route:Router,
    private toastr: ToastrService){
    this.signinForm=new FormGroup({
     username:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]),
     password:new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    })
  }
  
  onSubmit(){
  if (this.signinForm.valid){
    const formData=this.signinForm.value;
    this.authService.userSignin(formData).subscribe({
      next:(response:any)=>{
        console.log(response.data);
        if (response){
          localStorage.setItem('token', response.data);
          this.toastr.success("user logged in successfully");
          this.route.navigate(['/tasks']);
        }
      },
      error:(error: HttpErrorResponse
      ) => {
        console.log(error)
        this.toastr.error(error.error.message);
        // console.clear();
      }
      
    })
  }
  }
}
