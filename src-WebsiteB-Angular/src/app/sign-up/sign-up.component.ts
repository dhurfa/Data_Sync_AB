import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignUpViewModel } from '../sign-up-view-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpError : string = "";
  signUpForm !: FormGroup 
  constructor( private fb : FormBuilder, private router : Router, private authService : AuthService) { }

  ngOnInit(){
    this.signUpForm = new FormGroup({
        UserName : new FormControl('', Validators.required),
        Password : new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSignUpClick(){
    if(this.signUpForm.valid){
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
       this.authService.signUp(signUpViewModel).subscribe(
      (response) => {
        this.router.navigateByUrl("/login");
      },
      (error) => {
        console.log(error);
        this.signUpError = "Try different username or password";
      }
    );
  }
}
}
