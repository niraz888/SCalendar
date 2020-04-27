import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent, EditDialogData } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-get-movie-dialog',
  templateUrl: './get-movie-dialog.component.html',
  styleUrls: ['./get-movie-dialog.component.css']
})
export class GetMovieDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<GetMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetMovieData) { }

  ngOnInit(): void {
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
}
