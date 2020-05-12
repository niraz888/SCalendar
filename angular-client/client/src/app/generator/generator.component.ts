import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
import { GetMovieDialogComponent } from '../Dialog/get-movie-dialog/get-movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventType } from '../event';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  selectControl:FormControl = new FormControl()
  concertControl = new FormGroup({
    band: new FormControl(''),
    start:new FormControl(''),
    end: new FormControl(''),
  })
  TheathreControl = new FormGroup({
    place: new FormControl(''),
    from: new FormControl(''),
    until: new FormControl(''),
  })
  isWait: boolean;
  months = {1: 'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'August', 9:'September', 10:'October', 11:'November', 12:'December'}
  rangeOptions: string[];
  constructor(private server: ServerService, private dialog: MatDialog) { 
    this.rangeOptions = [];
  }

  ngOnInit(): void {
    this.isWait = false;
    var month = new Date().getUTCMonth() + 1;
    for (var i = month; i < month + 12;i++) {
      var res = i % 12;
      if (res == 0)
        res = 12
      this.rangeOptions.push(this.months[res]);
    }
  }

  openMovieDialog(data: any) {
    const dialogRef = this.dialog.open(GetMovieDialogComponent, {
      width: '450px',
  
      data: {name:data.name, duration:data.duration, year:data.year, link:'https://www.imdb.com' + data.link, start:'', end:''}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      var name = 'movie -' + result.name;
      var desc = 'see movie with ' + result.name
      var type = EventType.TvShow;
      var start = result.start.replace("T", " ") + ":00";
      var end = result.end.replace("T", " ") + ":00";
      this.add(name, desc, start, end, type);
    });
  }

  add(name:string, desc:string, start:string, end:string, type:EventType) {
    this.server.addEvent(name, desc, start, end, type).subscribe((data: any) =>  {
      if (data.error){
        var s = 3;
      } else{
        alert("Event Added Successfully");
      }
    },
      err => {
        console.log('Error: ' + err.error);
      });
    
  }

  OnConcertSubmit(val: any) {
    var d = 3;
  }
  OnTheathreSubmit(form: any) {
    var place = form.value.place;
    var from = form.value.from.substring(0, 3);
    var until = form.value.until.substring(0, 3);
    this.server.getShows(place, from, until).subscribe((data: any)=> {
      if (data.error) {
      } else {
        var d  = 3;
      }
    },
      err => {
        console.log('Error: ' + err.error);
      });

  }
  submit(val: any) {
    var i = val;
    let d  = 3;
    this.isWait = true;
    this.server.getMovie(val).subscribe((data: any) =>  {
      if (data.error){
        var s = 3;
      } else{
        this.isWait = false;
        this.openMovieDialog(data);
      }
    },
      err => {
        console.log('Error: ' + err.error);
      });
    
    }
}
