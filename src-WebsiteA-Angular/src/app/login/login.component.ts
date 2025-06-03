import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../login-view-model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginViewModel : LoginViewModel = new LoginViewModel();
  loginError : string = "";
  login : any;
  constructor(  private router : Router, private authService : AuthService) { }

  ngOnInit(){
    
  }

  onLoginClick(event : any ){
    console.log(event);
    this.authService.authUser(this.loginViewModel).subscribe(
      (response : LoginViewModel) => {
        console.log(response);
        const user = response;
        localStorage.setItem('token', user.Token);
        localStorage.setItem('Username', this.loginViewModel.UserName);
        this.router.navigateByUrl(`/entry/${this.loginViewModel.UserName}`);
      },
      (error) => {
      console.log(error);
      this.loginError = "Invalid Username or Password";
      }
    );
  }

  


  
}
