import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginViewModel } from '../login-view-model';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service : AuthService;
  let mockService : any;
  let router : Router;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [HttpClientModule, FormsModule],
      providers : [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockService = jasmine.createSpyObj(['authUser']);
    service = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  

  it('[Username - Check] - Check if Username is invalid', () =>{
    fixture.whenStable().then(() => {
        fixture.debugElement.nativeElement.querySelector('#UserName');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const usernameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#UserNameError');
          expect(usernameErrors.children.length).toEqual(1);
          expect(usernameErrors.children[0].innerHTML).toEqual('Username is required');
        })
      })
  });

  it('[Username - Check] - Check if Username is valid', () =>{
    const usernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#UserName');
    usernameElement.value = 'Dhurfa';
    usernameElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const usernameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#UserNameError');
    expect(usernameErrors).toBeNull();
  });


  it('[Password - Check] - Check if Password is invalid', () =>{
    fixture.whenStable().then(() => {
      const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
      passwordElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const passwordErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PasswordError');
        expect(passwordErrors.children.length).toEqual(1);
        expect(passwordErrors.children[0].innerHTML).toEqual('Password is required');
      })
      passwordElement.value = "dhur";
      passwordElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const passwordErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PasswordError');
        expect(passwordErrors.children.length).toEqual(1);
        expect(passwordErrors.children[0].innerHTML).toEqual('Password must contain atleast 6 characters');
      })
      })
  });

  it('[Password - Check] - Check if Password is valid', () =>{
    const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
    passwordElement.value = "dhurfa2000";
    const passwordErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PasswordError');
    expect(passwordErrors).toBeNull();   
  });

  it('[Submit - Check] - Check if Submit button is disabled', () => {
    fixture.detectChanges();
    const submitElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#Btn');
    expect(submitElement.disabled).toBeTruthy();
  });

  it('[Submit - Check] - Check if Submit button is enabled', () => {
    fixture.detectChanges();
    const usernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#UserName');
    const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
    const submitElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#Btn');

    usernameElement.value = 'Dhurfa';
    passwordElement.value = "dhurfa2000";

    usernameElement.dispatchEvent(new Event('input'));
    passwordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitElement.disabled).toBeFalsy();

  });

  it('[Form - Check] - Check if LoginViewModel is updated', () => {
    fixture.detectChanges();
    const usernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#UserName');
    const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
    const submitElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#Btn');

    usernameElement.value = 'Dhurfa';
    passwordElement.value = "dhurfa2000";

    usernameElement.dispatchEvent(new Event('input'));
    passwordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.loginViewModel.UserName).toEqual("Dhurfa");
    expect(component.loginViewModel.Password).toEqual("dhurfa2000");
    expect(submitElement.disabled).toBeFalsy();
  });

  it('[Logout - Check]', () => {
    const inputData : LoginViewModel = {
      UserName : 'Rohit',
      Password : 'rohit123',
      Token : 'abcdefgh1234'
    };

    localStorage.setItem(inputData.Token, inputData.Password);
    component.onLoginClick(event);
    let result = localStorage.length;
    expect(result).not.toBeNull();
  });

  it('[OnSignUpClick - Check] - Check if Form is valid', () => {
    mockService.authUser.and.returnValue(of(true));
    let inputData : LoginViewModel = {
      UserName : 'Dhurfa',
      Password : 'dhurfa',
      Token : 'abcdefg'
    };
    component.onLoginClick(inputData);
    service.authUser(inputData).subscribe((data: any) => {
      const spy = spyOn(router , 'navigateByUrl');
      expect(spy.calls.first().args[0]).toContain("/login")
    })
  });

});






