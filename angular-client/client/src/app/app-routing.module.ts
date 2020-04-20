import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:  '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:  'dashboard', component:DashboardComponent, canActivate: [AuthGuard],
  children: [
    {path: '', redirectTo: 'calendar', pathMatch:'full'},
    {path: 'calendar', component:CalendarComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
