import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerService } from '../server.service';
import { GetMovieDialogComponent } from '../Dialog/get-movie-dialog/get-movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  selectControl:FormControl = new FormControl()
  isWait: boolean;
  constructor(private server: ServerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isWait = false;
  }

  openMovieDialog(data: any) {
    const dialogRef = this.dialog.open(GetMovieDialogComponent, {
      width: '450px',
  
      data: {name:data.name, duration:data.duration, year:data.year, link:'https://www.imdb.com' + data.link}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      console.log('The dialog was closed');
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
