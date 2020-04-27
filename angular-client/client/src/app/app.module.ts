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
import {MatDialogModule} from '@angular/material/dialog'
import 'hammerjs';
import { EditDialogComponent } from './Dialog/edit-dialog/edit-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { SettingsComponent } from './settings/settings.component';
import { AddEventComponent } from './Dialog/add-event/add-event.component';
import { DeleteDialogComponent } from './Dialog/delete-dialog/delete-dialog.component';
import { GeneratorComponent } from './generator/generator.component';
import { GetMovieDialogComponent } from './Dialog/get-movie-dialog/get-movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CalendarComponent,
    EditDialogComponent,
    SettingsComponent,
    AddEventComponent,
    DeleteDialogComponent,
    GeneratorComponent,
    GetMovieDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
  entryComponents: [EditDialogComponent],
})
export class AppModule { }
