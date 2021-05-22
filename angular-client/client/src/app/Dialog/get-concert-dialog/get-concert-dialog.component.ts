import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-get-concert-dialog',
  templateUrl: './get-concert-dialog.component.html',
  styleUrls: ['./get-concert-dialog.component.css']
})
export class GetConcertDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<GetConcertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetConcertsData) {
     }

  ngOnInit(): void {
  }
  onNoClick(): void {
    
    this.dialogRef.close();
  }
}

export class Concert {
  city: string;
  country: string;
  day: string;
  month: string;
  year: string;
  link: string;

  constructor(city: string, country: string, day: string, month: string, year: string, link: string){
    this.city = city;
    this.country = country;
    this.day = day;
    this.month = month;
    this.year =year;
    this.link = link;
  }
}
export interface GetConcertsData {
  concerts: string[];

}
