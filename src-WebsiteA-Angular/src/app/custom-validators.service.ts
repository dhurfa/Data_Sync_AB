import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  public MaxAgeValidation(maxAge : number, minAge : number) : ValidatorFn
  {
    return (control : AbstractControl) : ValidationErrors | null => {
      if(! control.value)
      return null;

      var today = new Date();
      var date = new Date(control.value);
      var diffMilliSeconds = Math.abs(today.getTime() - date.getTime());
      var diffYears = (diffMilliSeconds / (1000*60*60*24))/365.25;

      if(diffYears <= maxAge && diffYears >= minAge)
        return null;
      else
        return { maxAgeForAdmission : { valid : false}};
    };
  }

  public MinAgeValidation(maxAge : number, maxAgeForAdmission : number) : ValidatorFn
  {
    return (control : AbstractControl) : ValidationErrors | null => {
      if(! control.value)
      return null;

      var today = new Date();
      var date = new Date(control.value);
      var diffMilliSeconds = Math.abs(today.getTime() - date.getTime());
      var diffYears = (diffMilliSeconds / (1000*60*60*24))/365.25;


      if(diffYears >= maxAge && diffYears >= maxAgeForAdmission)
        return null;
      else
        return { maxAgeBorn : { valid : false}};
    };
  }
}
