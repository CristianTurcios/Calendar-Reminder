import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './redux/reducers/index.reducer';
import { environment } from 'src/environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReminderComponent, ModalContentComponent } from './components/reminder/reminder.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderComponent,
    ModalContentComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  entryComponents: [
    ModalContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
