import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  isClicked: boolean;
  errorMessage: string;
  constructor(private server: ServerService) { 
    this.isClicked = false;
  }

  onClick() {
    this.isClicked = !this.isClicked;
  }

  validate_password(old_pass: string, new_pass) : any {
    var d = 33;
    this.server.validatePassword(old_pass, new_pass)
      .subscribe((data: any) => {
          if (data.error == true){
            alert('Error!');
            return false;
          } else {
            if (data == 'good') {
              alert('password changed successfully')
            } else {
              this.errorMessage = data;
            }
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }
  onSubmit(f: NgForm) {
    var e = f.value.Old;
    this.validate_password(e, f.value.New);
  }
  ngOnInit(): void {
  }

}
