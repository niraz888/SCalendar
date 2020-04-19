import { Component, OnInit } from '@angular/core';
import {EventType, Event} from '../event'
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  months = {1 : 31, 2: 28, 3: 31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:30}
  current_year = 0
  current_month = 0
  calendar = []
  events = [];
  constructor() { }

  ngOnInit() {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var first_day = new Date(year + "-" + month + "-01").getDay()
    var i = 0;
    for(i = 0; i < first_day; i++) {
      this.calendar.push(0);
    }
    var count = this.months[month]
    var j= 1;
    for(j = 1; j < count + 1;j++) {
      this.calendar.push(j)
    } 
    var event1 = new Event('mangal', 'this is mangal', EventType.birthday, new Date("2020-04-03 12:30:00"));
    var event2 = new Event('meeting', 'this is mangal', EventType.business, new Date("2020-04-03 12:30:00"));
    var event3 = new Event('TvShow', 'this is mangal', EventType.TvShow, new Date("2020-04-01 12:30:00"));
    var event4 = new Event('mangal2', 'this is mangal', EventType.birthday, new Date("2020-04-03 12:30:00"));
    this.events.push(event1);
    this.events.push(event2);
    this.events.push(event3);
    this.events.push(event4);

  }
  getColor(type:EventType){
    if (type == EventType.birthday) {
      return 'red';
    } else if (type == EventType.business) {
      return 'purple';
    } else if (type == EventType.TvShow) {
      return 'blue';
    }
  }
}
