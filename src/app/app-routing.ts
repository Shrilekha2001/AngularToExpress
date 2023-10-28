import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path:'aboutus', component:AboutusComponent},//if the url end with '/aboutus' it should render aboutus component
{path: 'contactus', component:ContactusComponent},{path: 'home', component:HomeComponent},{path: 'login', component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export  const routeComponents=[HomeComponent,AboutusComponent,ContactusComponent,LoginComponent];