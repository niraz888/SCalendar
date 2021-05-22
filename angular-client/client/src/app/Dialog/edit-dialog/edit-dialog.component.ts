import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventType } from 'src/app/event';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData, public dialog:  MatDialog, private server:ServerService) { }

  selected = 'gello';
  types: TypeValue[] = [
    {value: EventType.birthday, viewValue: 'Birthday'},
    {value: EventType.TvShow, viewValue: 'Tv Show'},
    {value: EventType.business, viewValue: 'Bussiness'},
    {value: EventType.concert, viewValue: 'Concert'},
    {value: EventType.other, viewValue:'Other'}
  ];
  ngOnInit(): void {
  }
  onNoClick(action: string): void {
    
    this.dialogRef.close(action);
  }

  openDeleteDialog(i:  number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
  
      data: {isDelete:true, id:i}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      var d = 3;
      if (!result) {
        return;
      } else {
        this.onDelete(result.id);
        this.onNoClick('delete');
      }
      console.log('The dialog was closed');
    });
  }
  onDelete(id: number) {
    this.server.deleteEvent(id).subscribe((data:any) => {
      if (data.error == true){
        alert(data);
      } else {
        alert(data);
      }
    },
    err => {
      console.log('Error: ' + err.error);
    });
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

export interface TypeValue {
  value: EventType;
  viewValue: String;
}
