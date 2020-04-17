import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private server: ServerService) { }

  ngOnInit() {
  }

  OnSubmit(f:  NgForm) {
    var d = 33;
    this.server.loginUser(f.value.Email,f.value.Password)
      .subscribe((data: any) => {
          if (data.error == true){
            alert('Error!');
          } else {
            alert(data[0])
            this.router.navigateByUrl('/dashboard')
          }
        },
        err => {
          console.log('Error: ' + err.error);
        });
  }
}
