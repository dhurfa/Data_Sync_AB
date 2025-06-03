import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { UpdateEntry } from '../update-entry';
import { CustomValidatorsService } from '../custom-validators.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  UserName : any;
  data : any;
  displayStyle = "none";
  editEntry : UpdateEntry = new UpdateEntry();

  constructor(private entryService : EntryService, private route: ActivatedRoute, private router : Router,
    public customValidatorsService : CustomValidatorsService){}

  ngOnInit() : void {
    this.UserName = this.route.snapshot.params['UserName'];
    this.loadEntry();
  }

  onCreateClick(){
    this.router.navigateByUrl(`/createEntry/${this.UserName}`);
  }

  openPopup(event : any) {
    this.displayStyle = "block";
    this.editEntry.FirstName = this.data.FirstName;
    this.editEntry.LastName = this.data.LastName;
    this.editEntry.Admission = this.data.Admission;
    this.editEntry.PracticingArea = this.data.PracticingArea;
    this.editEntry.PracticeLocation = this.data.PracticeLocation;
  }

  closePopup() {
    this.displayStyle = "none";
  }

  loadEntry(){
    this.data = this.entryService.getEntries(this.UserName).subscribe(
    (data) => {
      this.data = data;
      console.log(this.data);
    },
    (error) => {
      console.log(error);
      alert("Authentication failed");
    }
    );
  }

  onUpdateClick(){
    this.entryService.updateEntries(this.editEntry).subscribe(
      (response : UpdateEntry) => {
        this.loadEntry();
        this.closePopup();
      },
      (error) => {
        console.log(error);
      }
    );
  }




  
}