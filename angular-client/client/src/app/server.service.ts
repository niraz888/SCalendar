import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { EventType } from './event';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  rootUrl = "http://localhost:5000/api"
  secUrl = "http://localhost:5000/bp"
  constructor(private http: HttpClient) { }

  /* section of /api REST */
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

  editEvent(event_id: number, name:string, desc:string, start:string, end:string, type:EventType) {
    const postData = new FormData()
    postData.append('event_id', event_id.toString());
    postData.append('name', name);
    postData.append('description', desc);
    postData.append('start', start);
    postData.append('end', end);
    postData.append('type', type.toString());
    return this.http.post(this.rootUrl + '/edit_event', postData);
  }

  addEvent(name:string, desc:string, start:string, end:string, type:EventType){
    const postData = new FormData()
    postData.append('event_name', name);
    postData.append('user_id', localStorage.getItem('user_id'));
    postData.append('description', desc);
    postData.append('start_time', start);
    postData.append('end_time', end);
    postData.append('type', type.toString());
    return this.http.post(this.rootUrl + '/add_event', postData);
  }
  validatePassword(old_pass: string, new_pass: string) {
    const postData = new FormData();
    postData.append('user_id', localStorage.getItem('user_id'));
    postData.append('old_password', old_pass);
    postData.append('password', new_pass);
    return this.http.post(this.rootUrl + '/update_pass', postData);
  }

  deleteEvent(id: number) {
    const postData = new FormData();
    postData.append('event_id', id.toString());
    return this.http.post(this.rootUrl + '/delete_event', postData);
  }

  /* section of /api REST */
  /***********************/
  /********************* */
  /*********************** */

  getMovie(genre: string) {
    const params = new HttpParams().set('genre', genre);
    return this.http.get(this.secUrl + '/try', {params});
  }
}
