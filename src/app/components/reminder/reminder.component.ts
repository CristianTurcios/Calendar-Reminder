import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as ReminderActions from '../../redux/actions/reminders.actions';
import * as fromApp from '../../redux/reducers/index.reducer';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { IReminder } from 'src/app/interfaces/IReminder';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  bsModalRef: BsModalRef;
  subscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('reminder').subscribe(stateData => {
      console.log('stateData', stateData);
      if (stateData.editedReminder) {
        this.openModal(stateData.editedReminder, 'Edit Reminder');
      } else if (stateData.dayOfMonth) {
        const reminder = {
          id: moment().hours(0).minutes(0).seconds(0).valueOf(),
          name: '',
          city: '',
          date: stateData.dayOfMonth.date,
          hour: moment().format('HH:mm'),
          color: '#28a745',
          weather: ''
        };
        this.openModal(reminder, 'Add New Event');
      }
    });
  }

  openModal(reminder: IReminder, title: string): void {
    const initialState = { event, title };
    this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
  }
}

/* This is a component which we pass in modal*/
@Component({
  selector: 'app-modal-reminder',
  templateUrl: './reminder-modal.component.html',
})

export class ModalContentComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }


  closeModal(): void {
    this.bsModalRef.hide();
  }
}
