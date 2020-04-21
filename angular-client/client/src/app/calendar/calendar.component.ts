import { Component, OnInit } from '@angular/core';
import {EventType, Event, lexicMonth} from '../event'
import { ServerService } from '../server.service';
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
  constructor(private server: ServerService) { }

  helo(){
    console.log("hello");
  }
  ngOnInit() {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.current_month = month;
    this.current_year = year;
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
  change_month() {
    var first_day = new Date(this.current_year + "-" + this.current_month + "-01").getDay()
    var i = 0;
    for(i = 0; i < first_day; i++) {
      this.calendar.push(0);
    }
    var count = this.months[this.current_month]
    var j= 1;
    for(j = 1; j < count + 1;j++) {
      this.calendar.push(j)
    } 
  }
  forward() {
    this.events = [];
    this.calendar = [];
    if (this.current_month == 12) {
      this.current_month = 1;
      this.current_year = this.current_year + 1;
    }else{
      this.current_month = this.current_month + 1;
    }
    this.change_month();
    this.getCurrentEvents();
  }
  backward() {
    this.events = [];
    this.calendar = [];
    if (this.current_month == 1) {
      this.current_month = 12;
      this.current_year = this.current_year - 1;
    }else{
      this.current_month = this.current_month - 1;
    }
     this.change_month();
     this.getCurrentEvents();
  }

  getCurrentEvents() {
    var month = this.current_month;
    var year = this.current_year;
    this.server.getEvents(month, year).subscribe((data:any) => {
      if (data.error == true){
        alert('Error!');
      } else {
        let i = 0;
        var lex = new lexicMonth();
        for(i = 0; i < data.length; i++) {
          var event_id = data[i][0];
          var name = data[i][1];
          var desc = data[i][4];
          var user_id = data[i][5]
          var type = data[i][6]

          var start = data[i][2];
          var splitted = start.split(" ");
          var temp_month = splitted[2]
          var month = lex.mapper[temp_month];
          var year = splitted[3];
          var day = splitted[1];
          var hour = splitted[4]
          var date : string = year + "-" + month + "-" + day + " "+ hour;
          var event = new Event(name, desc, type, new Date(date));
          this.events.push(event)
        }
        var dsd = 3;
      }
    },
    err => {
      console.log('Error: ' + err.error);
    });
    
  }

  getColor(type:EventType){
    if (type == EventType.birthday) {
      return 'red';
    } else if (type == EventType.business) {
      return 'purple';
    } else if (type == EventType.TvShow) {
      return 'blue';
    } else if (type == EventType.concert) {
      return 'yellow';
    } 
  }
}
