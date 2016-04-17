// authentication.ts
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/RX';
import {Device} from 'ionic-native';

import {KINVEY_BASE_URL, KINVEY_AUTH} from './config';

@Injectable()
export class Authentication {
  token: string;

  constructor(public http: Http) {
    this.token = localStorage.getItem('token');
  }

  createUser(userInfo) {
    let params = JSON.stringify({
      username: userInfo.username,
      password: userInfo.password,
      first_name : userInfo.first_name,
      last_name : userInfo.last_name,
      device_id : Device.device.uuid
    });
    return this.http.post(KINVEY_BASE_URL + 'user/kid_ZJBVZWhQWW/', params, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + KINVEY_AUTH,
        'X-Kinvey-API-Version': 3
      })
    })
      .map((res: any) => {
      let data = res.json();
      this.token = data._kmd.authtoken;
      localStorage.setItem('token', this.token);
      return data
    });
  }

  login(username: String, password: String) {

    let params = JSON.stringify({
      username: username,
      password: password
    });
    return this.http.post(KINVEY_BASE_URL + 'user/kid_ZJBVZWhQWW/login', params, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + KINVEY_AUTH,
        'X-Kinvey-API-Version': 3
      })
    })
      .map((res: any) => {
      let data = res.json();
      this.token = data._kmd.authtoken;
      localStorage.setItem('token', this.token);
      return data
    });
  };

  logout() {
    let params = JSON.stringify({});
     return this.http.post(KINVEY_BASE_URL + 'user/kid_ZJBVZWhQWW/_logout', params, {
       headers: new Headers({
         'Content-Type': 'application/json',
        'Authorization': 'Kinvey ' + this.token,
         'X-Kinvey-API-Version': 3
       })
     })
       .map((res: any) => {
       this.token = undefined;
       localStorage.removeItem('token');
       return true
     });
  }
}
