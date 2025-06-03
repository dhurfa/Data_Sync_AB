import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { throwError } from 'rxjs';
import { CustomValidatorsService } from '../custom-validators.service';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

import { CreateEntryComponent } from './create-entry.component';

describe('CreateEntryComponent', () => {
  let component: CreateEntryComponent;
  let route : ActivatedRoute;
  let service : EntryService;
  let router : Router;
  let fixture: ComponentFixture<CreateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntryComponent ],
      imports : [ReactiveFormsModule , HttpClientModule, RouterModule.forRoot([])],
      providers : [CustomValidatorsService , EntryService,{
        provide : ActivatedRoute,
        useValue : {
          snapshot : {
            params : {
              UserName : "Dhurfa",
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EntryService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('[Validations - Check] - Check for invalid Validations', () =>{
    fixture.detectChanges();
    const lastName : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#LastName');
    const email : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Email');
    const admission : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#admission');
    const area : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#area');
    const location : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#location');
    const position : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#position');
    

    lastName.dispatchEvent(new Event('focus'));
    email.dispatchEvent(new Event('focus'));
    admission.dispatchEvent(new Event('focus'));
    area.dispatchEvent(new Event('focus'));
    location.dispatchEvent(new Event('focus'));
    position.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    lastName.dispatchEvent(new Event('blur'));
    email.dispatchEvent(new Event('blur'));
    admission.dispatchEvent(new Event('blur'));
    area.dispatchEvent(new Event('blur'));
    location.dispatchEvent(new Event('blur'));
    position.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
        
    const lastnameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#LastNameError');
    expect(lastnameErrors).not.toBeNull();
    lastName.value = "dhur";
    expect(lastnameErrors).not.toBeNull();
    lastName.value = "dhurfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    expect(lastnameErrors).not.toBeNull();

    let emailErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#EmailError');
    expect(emailErrors).not.toBeNull();
    email.value = "dhurfa";
    expect(emailErrors).not.toBeNull();
        
    let admissionErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#AdmissionError');
    expect(admissionErrors).not.toBeNull();
    admission.value = "2022-01-05T09:05:05.035Z";
    expect(admissionErrors).not.toBeNull();
        
    let areaErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#AreaError');
    expect(areaErrors).not.toBeNull();
    area.value = "Chennaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii";
    expect(areaErrors).not.toBeNull();

    const locationErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#LocationError');
    expect(locationErrors).not.toBeNull();

    const positionErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PositionError');
    expect(positionErrors).not.toBeNull();
  });


  it('[Validation - Check] - Check for valid validations', () => {
    fixture.detectChanges();
    const lastName : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#LastName');
    const email : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Email');
    const dob : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#dob');
    const admission : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#admission');
    const area : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#area');
    const location : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#location');
    const position : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#position');
    
    lastName.value = "Dhurfa";
    email.value = "dhurfas@gmail.com";
    dob.value = "1990-01-05T09:05:05.035Z";
    admission.value = "2019-01-05T09:05:05.035Z";
    area.value ="Guindy";
    location.value = "Chennai";
    position.value = "Manager";
    lastName.dispatchEvent(new Event('input'));
    email.dispatchEvent(new Event('input'));
    dob.dispatchEvent(new Event('input'));
    admission.dispatchEvent(new Event('input'));
    area.dispatchEvent(new Event('input'));
    location.dispatchEvent(new Event('input'));
    position.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const lastnameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#LastNameError');
    let emailErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#EmailError');
    let dobErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#DobError');
    let admissionErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#AdmissionError');
    let areaErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#AreaError');
    const locationErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#LocationError');
    const positionErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#PositionError');
    expect(lastnameErrors).toBeNull();
    expect(emailErrors).toBeNull();
    expect(dobErrors).toBeNull();
    expect(admissionErrors).toBeNull();
    expect(areaErrors).toBeNull();
    expect(locationErrors).toBeNull();
    expect(positionErrors).toBeNull();
  });
 
  it('[Form - Check] - Check if Form is invalid', () => {
    expect(component.newEntryForm.valid).toBeFalsy();
  });

  it('[Form - Check] - Check if Form is valid', () => {
    expect(component.newEntryForm.invalid).toBeTruthy();
    component.newEntryForm.controls['FirstName'].setValue("Dhurfa");
    component.newEntryForm.controls['LastName'].setValue("Najima");
    component.newEntryForm.controls['Email'].setValue("dhurfas@gmail.com");
    component.newEntryForm.controls['Born'].setValue("1990-01-05T09:05:05.035Z");
    component.newEntryForm.controls['Admission'].setValue("2019-01-05T09:05:05.035Z");
    component.newEntryForm.controls['PracticingArea'].setValue("Guindy");
    component.newEntryForm.controls['PracticeLocation'].setValue("Chennai");
    component.newEntryForm.controls['Position'].setValue("Manager");
    fixture.detectChanges();
    expect(component.newEntryForm.valid).toBeTruthy();
  });

  it('[Validations in Controller - Check] - Check for invalid Validations', () =>{
     let firstName = component.newEntryForm.controls['FirstName'];
     let lastName = component.newEntryForm.controls['LastName'];
     let born = component.newEntryForm.controls['Born'];
     let admission = component.newEntryForm.controls['Admission'];
     let email = component.newEntryForm.controls['Email'];
     let area = component.newEntryForm.controls['PracticingArea'];
     let location = component.newEntryForm.controls['PracticeLocation'];
     let position = component.newEntryForm.controls['Position'];

     expect(firstName.errors).toBeTruthy();
     expect(lastName.errors).toBeTruthy();
     expect(born.errors).toBeTruthy();
     expect(admission.errors).toBeTruthy();
     expect(email.errors).toBeTruthy();
     expect(area.errors).toBeTruthy();
     expect(location.errors).toBeTruthy();
     expect(position.errors).toBeTruthy();
  });

  it('[Validations in Controller - Check] - Check for valid Validations', () =>{
    let firstName = component.newEntryForm.controls['FirstName'];
    let lastName = component.newEntryForm.controls['LastName'];
    let born = component.newEntryForm.controls['Born'];
    let admission = component.newEntryForm.controls['Admission'];
    let email = component.newEntryForm.controls['Email'];
    let area = component.newEntryForm.controls['PracticingArea'];
    let location = component.newEntryForm.controls['PracticeLocation'];
    let position = component.newEntryForm.controls['Position'];

    firstName.setValue("Dhurfa");
    lastName.setValue("Najima");
    born.setValue("1990-01-05T09:05:05.035Z");
    admission.setValue("2019-01-05T09:05:05.035Z");
    email.setValue("dhurfas@gmail.com");
    area.setValue("Guindy");
    location.setValue("Chennai");
    position.setValue("Manager");
    expect(firstName.errors).toBeNull();
    expect(lastName.errors).toBeNull();
    expect(firstName.errors).toBeNull();
    expect(born.errors).toBeNull();
    expect(admission.errors).toBeNull();
    expect(email.errors).toBeNull();
    expect(area.errors).toBeNull();
    expect(location.errors).toBeNull();
    expect(position.errors).toBeNull();
 });

 it('[Create Click Navigation - Check]',() =>{
  const spy = spyOn(router , 'navigateByUrl');
  component.onCancelClick();
  expect(spy.calls.first().args[0]).toContain(`/entry/`)
});

it('[Route - Check]', async() => {
  expect(route.snapshot.params['UserName']).toEqual('Dhurfa');
  route.snapshot.params['UserName'] = "Gayathri";
  fixture.detectChanges();
  expect(route.snapshot.params['UserName']).toEqual("Gayathri");
  });

  it('[POST - Check]', () => {
    spyOn(service,'insertEntries').and.callThrough();
    const spy = spyOn(router , 'navigateByUrl');
    component.onCancelClick();
    expect(spy.calls.first().args[0]).toContain(`/entry/`);
   });

});
