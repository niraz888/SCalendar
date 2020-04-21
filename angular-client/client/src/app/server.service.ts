import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  rootUrl = "http://localhost:5000/api"
  constructor(private http: HttpClient) { }

  loginUser(email:  string, password: string) {
    const postData = new FormData();
    postData.append('username', email);
    postData.append('password', password);
    return this.http.post(this.rootUrl + '/login', postData);
  }

  registerUser(username:  string, password: string, phone:  string){
    const postData = new FormData();
    postData.append('username', username);
    postData.append('password', password);
    postData.append('phone', phone);
    return this.http.post(this.rootUrl + '/insert', postData);
  }

  getEvents(month: Number, year: Number){
    let user_id = localStorage.getItem('user_id');
    var n_month =  month.toString();;
    if (month < 10) {
      n_month = "0" + n_month;
    } 
    const params = new HttpParams()
    .set('user_id', user_id)
    .set('month', n_month)
    .set('year', year.toString());
    return this.http.get(this.rootUrl + '/get_events', {params})
  }
}
