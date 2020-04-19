import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ServerService} from './server.service';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component'
import {MatTooltipModule} from '@angular/material/tooltip'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
