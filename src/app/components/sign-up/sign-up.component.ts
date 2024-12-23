import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
signupForm:FormGroup;

constructor
  (private authService:AuthService,
  private route:Router,
  private toastr: ToastrService){
  this.signupForm=new FormGroup({
   firstName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]),
   lastName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]),
   username:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]),
   email:new FormControl('',[Validators.required,Validators.email]),
   password:new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
   role: new FormControl('user')
  })
}

onSubmit(){
if (this.signupForm.valid){
  const formData=this.signupForm.value;
  this.authService.userSignup(formData).subscribe({
    next:(response:any)=>{
      // console.log(response);
      if (response){
        this.signupForm.get('role')?.setValue('user');
        this.toastr.success("user registered successfully");
        this.route.navigate(['/login']);
      }
    },
    error:(error: HttpErrorResponse) => {
      this.toastr.error(error.error.message);
    }
    
  })
}
}

}
