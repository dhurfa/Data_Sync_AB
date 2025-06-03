import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CustomValidatorsService } from '../custom-validators.service';
import { EntryService } from '../entry.service';
import { UpdateEntry } from '../update-entry';

import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let service : EntryService;
  let router : Router;
  let route : ActivatedRoute;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ EntryComponent ],
      imports : [HttpClientModule , RouterModule.forRoot([]), FormsModule],
      providers : [EntryService, CustomValidatorsService,{
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

    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EntryService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('[Interpolation - Check]', () => {
    const firstName = fixture.debugElement.nativeElement.querySelector('#firstName');
    expect(firstName).toBeTruthy();
    component.data.FirstName = "Dhurfa";
    fixture.detectChanges();
    expect(firstName.innerHTML).toEqual(component.data.FirstName);
  });

  it('[Button Click -Check]', () => {
    fixture.detectChanges();
    const btnElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#UpdateBtn');
    const btnSyp = spyOn(component , 'onUpdateClick').and.callThrough();
    btnElement.click();
    expect(btnSyp).toHaveBeenCalledTimes(1);
  });


  it('[ngIf - Test]', () => {
    fixture.detectChanges();
    const ifElement : HTMLTableElement = fixture.debugElement.nativeElement.querySelector('#TestIf');
    component.data.FirstName = "Dhurfa";
    fixture.detectChanges();
    expect(ifElement).not.toBeNull();
  });

  it('[Create button disabled - Check]',() => {
    const btnElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#disabledBtn');
    expect(btnElement.disabled).toBeFalsy();
    component.data.Position = "Manager";
    fixture.detectChanges();
    expect(btnElement.disabled).toBeTruthy();
  });

  it('[ngStyle - Check]', () => {
    fixture.detectChanges();
    const styleElement : HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#editModal');
    expect(styleElement.getAttribute('style')).toContain('display: none;');
  });

  it('[Validations - Check] - Check if Validation is invalid', () =>{
    fixture.detectChanges();
    const lastName : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#LastName');
    const admission : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Admission');
    const area : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticingArea');
    const location : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticeLocation');

    lastName.dispatchEvent(new Event('focus'));
    admission.dispatchEvent(new Event('focus'));
    area.dispatchEvent(new Event('focus'));
    location.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    lastName.dispatchEvent(new Event('blur'));
    admission.dispatchEvent(new Event('blur'));
    area.dispatchEvent(new Event('blur'));
    location.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
        
    const lastnameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#LastNameError');
    expect(lastnameErrors).not.toBeNull();
    lastName.value = "dhur";
    expect(lastnameErrors).not.toBeNull();
    lastName.value = "dhurfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    expect(lastnameErrors).not.toBeNull();

    let admissionErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#admissionError');
    expect(admissionErrors).not.toBeNull();
    admission.value = "2022-01-05T09:05:05.035Z";
    expect(admissionErrors).not.toBeNull();
        
    let areaErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#areaError');
    expect(areaErrors).not.toBeNull();
    area.value = "Chennaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii";
    expect(areaErrors).not.toBeNull();

    const locationErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#locationError');
    expect(locationErrors).not.toBeNull();
  });


  it('[Validations - Check] - Check if Validation is valid', () =>{
    fixture.detectChanges();
    const firstName : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#FirstName');
    const admission : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Admission');
    const area : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticingArea');
    const location : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticeLocation');

    firstName.value = "Dhurfa";
    admission.value = "2016-01-05T09:05:05.035Z";
    area.value = "Guindy";
    location.value = "Chennai";

    firstName.dispatchEvent(new Event('input'));
    admission.dispatchEvent(new Event('input'));
    area.dispatchEvent(new Event('input'));
    location.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const firstnameErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#FirstNameError');
    expect(firstnameErrors).toBeNull();
    const areaErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#areaError');
    expect(areaErrors).toBeNull();
    const locationErrors : HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('#locationError');
    expect(locationErrors).toBeNull();
  });


  it('[Form - Check] - Check if editEntry is updated', () => {
    fixture.detectChanges();
    const firstName : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#FirstName');
    const admission : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#Admission');
    const area : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticingArea');
    const location : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#PracticeLocation');

    firstName.value = "Dhurfa";
    admission.value = "2016-01-05T09:05:05.035Z";
    area.value = "Guindy";
    location.value = "Chennai";

    firstName.dispatchEvent(new Event('input'));
    admission.dispatchEvent(new Event('input'));
    area.dispatchEvent(new Event('input'));
    location.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.editEntry.FirstName).toEqual("Dhurfa");
    //expect(component.editEntry.Admission).toEqual("2016-01-05T09:05:05.035Z");
    expect(component.editEntry.PracticingArea).toEqual("Guindy");
    expect(component.editEntry.PracticeLocation).toEqual("Chennai");
  });

  it('[GET - Check]', () => {
    let spy = spyOn(service,'getEntries').and.returnValue(of([]));
    component.loadEntry();
    expect(spy).toHaveBeenCalled();
  });

  it('[Create Click Navigation - Check]',() =>{
    const spy = spyOn(router , 'navigateByUrl');
    component.onCreateClick();
    expect(spy.calls.first().args[0]).toContain(`/createEntry/`)
  });

  it('[Route - Check]', async() => {
   expect(route.snapshot.params['UserName']).toEqual('Dhurfa');
   route.snapshot.params['UserName'] = "Gayathri";
   fixture.detectChanges();
   expect(route.snapshot.params['UserName']).toEqual("Gayathri");
   });


   it('[PUT - Check]', () => {
    let spy = spyOn(service,'updateEntries').and.callThrough();
    component.loadEntry();
    expect(component.loadEntry).toBeTruthy();
    expect(component.closePopup).toBeTruthy();
   });

   it('[OpenPopUp - Check]', ()=> {
    component.openPopup(event);
    expect(component.displayStyle).toEqual("block");
   });

   it('[ClosePopUp - Check]', ()=> {
    component.closePopup();
    expect(component.displayStyle).toEqual("none");
   });   


});