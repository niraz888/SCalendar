import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

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
}
