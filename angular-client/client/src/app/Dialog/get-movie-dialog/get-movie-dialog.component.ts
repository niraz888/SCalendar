import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent, EditDialogData } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-get-movie-dialog',
  templateUrl: './get-movie-dialog.component.html',
  styleUrls: ['../edit-dialog/edit-dialog.component.css']
})
export class GetMovieDialogComponent implements OnInit {

  isAdd: boolean;
  constructor( public dialogRef: MatDialogRef<GetMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetMovieData) {
      this.isAdd = false;
     }

  ngOnInit(): void {
  }

  add() {
    this.isAdd = !this.isAdd;
  }
  onNoClick(): void {
    
    this.dialogRef.close();
  }

}

export interface GetMovieData {
  name: string;
  duration: string;
  year: string;
  link: string;
  start: string;
  end: string;
}
