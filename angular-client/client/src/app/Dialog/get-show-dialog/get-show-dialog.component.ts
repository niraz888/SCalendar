import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-get-show-dialog',
  templateUrl: './get-show-dialog.component.html',
  styleUrls: ['./get-show-dialog.component.css']
})
export class GetShowDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<GetShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetShowsData) {
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }
}

export class Show {
  name: string;
  description: string;
  place: string;
  link: string;

  constructor(name: string, desc:string, place:string, link:string) {
    this.name = name;
    this.description = desc;
    this.place = place;
    this.link = link;
  }
}
export interface GetShowsData {
  shows: string[];

}