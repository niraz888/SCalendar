import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  concertControl:FormControl = new FormControl()
  isWait: boolean;
  constructor(private server: ServerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isWait = false;
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
