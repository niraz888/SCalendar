import { Component, OnInit } from '@angular/core';
import {EventType, Event, lexicMonth} from '../event'
import { ServerService } from '../server.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../Dialog/edit-dialog/edit-dialog.component';
import { AddEventComponent } from '../Dialog/add-event/add-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  months = {1 : 31, 2: 28, 3: 31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31}
  current_year = 0
  current_month = 0
  calendar = []
  events = [];
  constructor(public dialog:  MatDialog, private server: ServerService) { }

  openAddDialog(day_of:  number): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '450px',
  
      data: {name:'', description: '', start:'', end:'', type:1, day:day_of}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (day_of < 10) {
        var parse_day = "0" + day_of.toString()
      } else{
        var parse_day = day_of.toString()
      }
      
      if (this.current_month < 10) {
        var month = "0" + this.current_month.toString();
      } else {
        var month = this.current_month.toString();
      }


      var start_date = this.current_year + "-" + month + "-" + day_of + " " + result.start + ":00"
      var end_date = this.current_year + "-" + month + "-" + day_of + " " + result.end + ":00";
      this.sendAddEvent(result.name, result.description, start_date, end_date
        ,result.type);
      console.log('The dialog was closed');
    });
  }

  sendAddEvent(name: string, desc: string, start: string, end:string, type:EventType) {
    this.server.addEvent(name, desc, start, end, type).subscribe((data:any) => {
      if (data.error == true){
        alert(data);
      } else {
        var event = new Event(data,name, desc, type,  new Date(start));
        this.events.push(event)
      }
    },
    err => {
      console.log('Error: ' + err.error);
    });
  }

  openEditDialog(i:  number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      
      data: {name:this.events[i].name, description: this.events[i].description, start:'', end:'', type:1, index:i, event_id:this.events[i].getID()}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.events.splice(i, 1);
      }
      else if (result == 'no') {
        return;

      } else {
        this.sendEditEvent(this.events[i].getID(), result.name, result.description, result.start, result.end
        ,result.type);
      }
    });
  }

  getIndex(event_id: number) {
    for (var i = 0; i < this.events.length;i++) {
      if (this.events[i].event_id == event_id) {
        return i;
      }
    }
    return -1;
  }
  sendEditEvent(event_id: number, name:string, desc:string, start:string, end:string, type:EventType) {
    this.server.editEvent(event_id, name, desc, start, end, type).subscribe((data:any) => {
      if (data.error == true){
        alert(data);
      } else {
        alert(data);
        /*
        var index = this.getIndex(event_id);
        this.events[index].name = name;
        this.events[index].description = desc;
        this.events[index].type = type;
        */
      }
    },
    err => {
      console.log('Error: ' + err.error);
    });
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
    for(j = 1; j < count+1;j++) {
      this.calendar.push(j)
    } 
    var k = i + j;
    while (k % 6 != 0) {
      this.calendar.push(0);
      k++;
    }

    this.getCurrentEvents();
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
    /*
    for(var k =j; k < 42; k++) {
      this.calendar.push(0);
    }
    */
    var k = i + j;
    while (k % 6 != 0) {
      this.calendar.push(0);
      k++;
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
          var event = new Event(event_id, name, desc, type, new Date(date));
          this.events.push(event);
        }
        var dsd = 3;
      }
    },
    err => {
      console.log('Error: ' + err.error);
    },
    () => { console.log("Finish getting");}
    );
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
    } else {
      return 'green';
    }
  }
}
