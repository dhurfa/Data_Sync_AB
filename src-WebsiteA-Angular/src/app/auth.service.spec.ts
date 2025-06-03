import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { LoginViewModel } from './login-view-model';
import { SignUpViewModel } from './sign-up-view-model';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient : HttpClient;
  let httpTestControl : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestControl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestControl.verify();
  });

  it('[SignUp - Check]', () => {
    const inputData : SignUpViewModel = {
      UserName : 'Rohit',
      Password : 'rohit123'
    };
    service.signUp(inputData).subscribe((signUp) => {
      expect(signUp).toBe(inputData);
    })

    const req = httpTestControl.expectOne(service.APIUrl+"/User/register");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toEqual('POST');
    req.flush(inputData);
  });

  it('[Login - Check]', () => {
    const inputData : LoginViewModel = {
      UserName : 'Rohit',
      Password : 'rohit123',
      Token : 'abcdefgh1234'
    };
    service.authUser(inputData).subscribe((login) => {
      expect(login).toBe(inputData);
    })

    const req = httpTestControl.expectOne(service.APIUrl+'/User/login');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toEqual('POST');
    
    req.flush(inputData);
  });

  it('[Logout - Check]', () => {
    let key = "email";
    let value = "email@email.com";
    localStorage.setItem(key, value);
    service.onLogOut();
    let result = localStorage.length;
    expect(result).toEqual(0);
  });

});
