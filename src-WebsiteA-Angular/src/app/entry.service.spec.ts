import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { EntryService } from './entry.service';
import { Entry } from './entry';
import { UpdateEntry } from './update-entry';

describe('EntryService', () => {
  let service: EntryService;
  let httpTestControl : HttpTestingController;
  let httpClient : HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ HttpClientTestingModule],
      providers : [EntryService]
    });
    service = TestBed.inject(EntryService);
  });

  beforeEach(()=>{
    httpTestControl = TestBed.get(HttpTestingController);
  });

  afterEach(()=>{
    httpTestControl.verify();
  });

  it('[Get - Check]', () => {
    let UserName = "Dhurfa";
    const res : Entry[] =[{
      Id : 1 ,
      FirstName : "Dhurfa",
      LastName : "Najima",
      Email : "dhurfas@gmail.com",
      Born : "1990-01-05T09:05:05.035Z",
      Admission : "2019-01-05T09:05:05.035Z",
      PracticingArea : "Guindy",
      PracticeLocation : "Chennai",
      Position : "Manager"
    }];
    service.getEntries(UserName).subscribe((entries) => {
      expect(res).toBe(entries);
    });
    const req = httpTestControl.expectOne(service.APIUrl+`/Entry/${UserName}`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(res);
  });

  it('[Post - Check]', () => {
    const request : Entry = {
      Id : 1 ,
      FirstName : "Dhurfa",
      LastName : "Najima",
      Email : "dhurfas@gmail.com",
      Born : "1990-01-05T09:05:05.035Z",
      Admission : "2019-01-05T09:05:05.035Z",
      PracticingArea : "Guindy",
      PracticeLocation : "Chennai",
      Position : "Manager"
    };
    service.insertEntries(request).subscribe((entries) => {
      expect(entries).toBe(request);
    });
    const req = httpTestControl.expectOne(service.APIUrl+"/Entry/create");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(request);
  });

  it('[Put - Check]', () => {
    const request : UpdateEntry = {
      FirstName : "Dhurfa",
      LastName : "Najima",
      Admission : "2019-01-05T09:05:05.035Z",
      PracticingArea : "Guindy",
      PracticeLocation : "Chennai"
    };
    service.updateEntries(request).subscribe((entries) => {
      expect(entries).toBe(request);
    });
    const req = httpTestControl.expectOne(service.APIUrl+"/Entry/edit/");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.method).toEqual('PUT');
    expect(req.request.responseType).toEqual('json');
    req.flush(request);
  });

});