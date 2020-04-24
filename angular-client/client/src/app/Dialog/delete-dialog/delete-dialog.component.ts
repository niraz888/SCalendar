import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogData } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }
  onNoClick(i: number) {
    var d = i;
    this.dialogRef.close()
  }
  ngOnInit(): void {
  }

}

export interface DeleteDialogData {
  isDelete: 'string';
  index: number;
}
