import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignUpViewModel } from '../sign-up-view-model';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let comp : SignUpComponent;
  let service : AuthService;
  let mockService : any;
  let router : Router;
  let fb : FormBuilder;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent],
      imports : [ReactiveFormsModule, HttpClientModule],
      providers : [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    mockService = jasmine.createSpyObj(['signUp']);
    comp = new SignUpComponent(fb , router , mockService);
    fixture.detectChanges();
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });
  it('[Username - Check] - Check if Username is invalid', () => {
    let UserName = component.signUpForm.controls['UserName'];
    expect(UserName.errors).toBeTruthy();
  });

  it('[Username - Check] - Check if Username is valid', () => {
    let username = component.signUpForm.controls['UserName'];
    username.setValue("Dhurfa");
    expect(username.errors).toBeNull();
  });

  it('[Password - Check] - Check if Password is invalid', () => {
    let Password = component.signUpForm.controls['Password'];
    expect(Password.errors).toBeTruthy();
    Password.setValue("dhur");
    expect(Password.errors).toBeTruthy();
  });

  it('[Password - Check] - Check if Password is valid', () => {
    let Password = component.signUpForm.controls['Password'];
    Password.setValue("dhurfa");
    expect(Password.hasError('required','Password')).toBeFalsy();
    expect(Password.hasError('minlength','Password')).toBeFalsy();
    expect(Password.valid).toBeTruthy();
  });

  it('[Form - Check] - Check if Form is invalid', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('[Form - Check] - Check if Form is valid', () => {
    component.signUpForm.controls['UserName'].setValue("Dhurfa");
    component.signUpForm.controls['Password'].setValue("dhurfa");
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('[Submit - Check]  - Check if form is submitted', () => {
    expect(component.signUpForm.invalid).toBeTruthy();
    let addButton = fixture.debugElement.query(By.css('#signUpButton'));
    expect(addButton.nativeElement.disabled).toBeTruthy();
    component.signUpForm.controls['UserName'].setValue("Dhurfa");
    component.signUpForm.controls['Password'].setValue("dhurfa");
    fixture.detectChanges();
    expect(addButton.nativeElement.disabled).toBeFalsy();
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('[Validation - Check] - Check for invalid validations', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const usernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#UserName');
      const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const usernameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#UserNameError');
        const passwordErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PasswordError');
        expect(usernameErrors.children.length).toEqual(1);
        expect(usernameErrors.children[0].innerHTML).toEqual('Username is required');
        expect(passwordErrors.children.length).toEqual(1);
        expect(passwordErrors.children[0].innerHTML).toEqual('Password is required');

        passwordElement.value="dhur";
        passwordElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(passwordErrors.children.length).toEqual(1);
        expect(passwordErrors.children[0].innerHTML).toEqual('Password must contain atleast 6 characters');
        const signUpButton : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#signUpButton');
        expect(signUpButton.disabled).toBeTruthy();
      })
    })
  });

  it('[Validation - Check] - Check for valid validations', () => {
    fixture.detectChanges();
    const usernameElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#UserName');
    const passwordElement : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Password');
    usernameElement.value ="Dhurfa";
    passwordElement.value="dhurfa2000";
    usernameElement.dispatchEvent(new Event('input'));
    passwordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const usernameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#UserNameError');
    const passwordErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PasswordError');
    expect(usernameErrors).toBeNull();
    expect(passwordErrors).toBeNull();
  });

  it('[OnSignUpClick - Check] - Check if Form is valid', () => {
    mockService.signUp.and.returnValue(of(true));
    component.signUpForm.controls['UserName'].setValue("Dhurfa");
    component.signUpForm.controls['Password'].setValue("dhurfa");
    expect(component.signUpForm.valid).toBeTruthy();
    let inputData : SignUpViewModel = {
      UserName : 'Dhurfa',
      Password : 'dhurfa',
    };
    component.onSignUpClick();
    service.signUp(inputData).subscribe((data: any) => {
      const spy = spyOn(router , 'navigateByUrl');
      expect(spy.calls.first().args[0]).toContain("/login");
      const mockCall = spyOn(service,'signUp').and.returnValue(throwError({signUpError : "Try different username or password"}));
      expect(component.signUpError).toEqual("Try different username or password");
    })
  });
});
