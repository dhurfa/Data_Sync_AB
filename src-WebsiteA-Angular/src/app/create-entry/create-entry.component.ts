import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidatorsService } from '../custom-validators.service';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {
  newEntryForm!: FormGroup;
  UserName: any;

  constructor(private entryService : EntryService, private router : Router, private route: ActivatedRoute,
    private customValidatorService : CustomValidatorsService) { }


  ngOnInit(){
    this.newEntryForm = new FormGroup({
      FirstName : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
      LastName : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
      Born : new FormControl('',[Validators.required,this.customValidatorService.MinAgeValidation(24, 20)]),
      Email : new FormControl(null, [Validators.required, Validators.email]),
      Admission : new FormControl('', [Validators.required, this.customValidatorService.MaxAgeValidation(72,1)]),
      PracticingArea : new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      PracticeLocation  : new FormControl(null, [Validators.required]),
      Position : new FormControl(null, [Validators.required])
    });
    this.UserName = this.route.snapshot.params['UserName'];
  }
  
  
  onCreateEntryClick(event : any){
    if(this.newEntryForm.valid){
      this.entryService.insertEntries(this.newEntryForm.value).subscribe(
        (response) => {
        this.router.navigateByUrl(`/entry/${this.UserName}`);
      },
        (error) => {
          console.log(error);
      });
    }
  }

  onCancelClick(){
    this.router.navigateByUrl(`/entry/${this.UserName}`)
  }

}
