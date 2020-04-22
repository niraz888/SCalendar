import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventType } from 'src/app/event';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData) { }

  selected = 'gello';
  types: TypeValue[] = [
    {value: EventType.birthday, viewValue: 'BirthDay'},
    {value: EventType.TvShow, viewValue: 'Tv Show'},
    {value: EventType.business, viewValue: 'Bussiness'},
    {value: EventType.concert, viewValue: 'concert'}
  ];
  ngOnInit(): void {
  }
  onNoClick(ini:  string): void {
    this.dialogRef.close();
  }
  onSelected(event: any){
    this.data.type = event.value;
  }
}

export interface EditDialogData {
  name: string;
  description:  string;
  start: Date;
  end: Date;
  type: EventType;
}

interface TypeValue {
  value: EventType;
  viewValue: String;
}
