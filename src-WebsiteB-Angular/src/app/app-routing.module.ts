import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EntryComponent } from './entry/entry.component';
import { CreateEntryComponent } from './create-entry/create-entry.component';

const routes: Routes = [
  { path:"signUp", component: SignUpComponent },
  { path:"", redirectTo:"login", pathMatch:"full"},
  { path:"login", component: LoginComponent },
  { path: "entry/:UserName", component: EntryComponent },
  { path : "createEntry/:UserName" , component: CreateEntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
