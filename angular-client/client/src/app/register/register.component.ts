import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

constructor(private server:ServerService, private router: Router) { }

  ngOnInit() {
  }
  OnSubmit(f:  NgForm) {
    this.server.registerUser(f.value.Username,f.value.Password, f.value.Phone)
      .subscribe((data: any) => {
          if (data.error == true){
            alert('Error!');
          } else {
            alert(data[0]);
            this.router.navigateByUrl('/login');
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }

}
