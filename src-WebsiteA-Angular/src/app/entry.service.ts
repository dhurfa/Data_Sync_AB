import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Entry } from './entry';
import { UpdateEntry } from './update-entry';
import { GridAutoDirective } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  readonly APIUrl = "https://localhost:7176/api";
  constructor(private httpClient : HttpClient) { }

  getEntries(UserName: any):Observable<Entry[]>{
    return this.httpClient.get<Entry[]>(`${this.APIUrl}/Entry/${UserName}`, {responseType : "json"});
  }

  insertEntries(response : Entry) : Observable<Entry>{
    return this.httpClient.post<Entry>(this.APIUrl+"/Entry/create", response, {responseType: "json"});
  }

  updateEntries(existingEntry : UpdateEntry): Observable<UpdateEntry>{
    return this.httpClient.put<UpdateEntry>(this.APIUrl+"/Entry/edit/", existingEntry, { responseType : "json"});
  }
}
