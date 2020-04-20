import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private username: string;
  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem('username')
  }

  ngOnDestroy(){
    localStorage.clear();
    console.log("bye byle");

  }
}
