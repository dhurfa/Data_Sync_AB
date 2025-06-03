import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth.service";
import { CreateEntryComponent } from "./create-entry/create-entry.component";
import { CustomValidatorsService } from "./custom-validators.service";
import { EntryService } from "./entry.service";
import { EntryComponent } from "./entry/entry.component";
import { JwtInterceptorService } from "./jwt-interceptor.service";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    EntryComponent,
    CreateEntryComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [EntryService, AuthService, CustomValidatorsService,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : JwtInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
