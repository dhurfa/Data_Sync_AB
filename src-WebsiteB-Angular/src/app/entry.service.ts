import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Entry } from './entry';
import { UpdateEntry } from './update-entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  readonly APIUrl = "https://localhost:7211/api"

  constructor(private httpClient : HttpClient){ }

  getEntries(UserName: any):Observable<Entry[]>{
    return this.httpClient.get<Entry[]>(`${this.APIUrl}/Entry/${UserName}`, {responseType : "json"});
  }

  insertEntries(response : Entry) : Observable<Entry>{
    return this.httpClient.post<Entry>(this.APIUrl+"/Entry/Create", response, {responseType: "json"});
  }

  updateEntries(existingEntry : UpdateEntry): Observable<UpdateEntry>{
    return this.httpClient.put<UpdateEntry>(this.APIUrl+"/Entry/Edit/", existingEntry, { responseType : "json"});
  }
}
