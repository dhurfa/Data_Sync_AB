import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { SignUpViewModel } from './sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIUrl = "https://localhost:7176/api"
  currentUserName : any = null ;
  Loading = false;

  constructor(private httpClient : HttpClient) { }

  authUser(loginViewModel : LoginViewModel) : Observable<any>
  {
    return this.httpClient.post<any>(this.APIUrl+'/User/login', loginViewModel).pipe(map(user => {
      if(user)
      {
        this.currentUserName=user.UserName;
        this.Loading = true;
      }
      return user;
    }));
  }

  signUp(signUpViewModel : SignUpViewModel) : Observable<any>
  {
    return this.httpClient.post<any>(this.APIUrl+"/User/register",signUpViewModel);
  }

  onLogOut(){
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
  }
}
