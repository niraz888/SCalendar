import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditDialogData, EditDialogComponent, TypeValue } from '../edit-dialog/edit-dialog.component';
import { EventType } from 'src/app/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['../edit-dialog/edit-dialog.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData) { }

    types: TypeValue[] = [
      {value: EventType.birthday, viewValue: 'Birthday'},
      {value: EventType.TvShow, viewValue: 'Tv Show'},
      {value: EventType.business, viewValue: 'Bussiness'},
      {value: EventType.concert, viewValue: 'Concert'},
      {value: EventType.other, viewValue:'Other'}
    ];
  ngOnInit(): void {
  }

    onSelected(event: any){
      this.data.type = event.value;
    }
  
  onNoClick(ini:  string): void {
    this.dialogRef.close();
  }
}
