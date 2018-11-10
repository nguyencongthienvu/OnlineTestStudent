import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
import { Profile } from '../models/profile';
@Injectable()
export class ProfileServiceService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  Profile(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/student/student`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  EditProfile(Profile:Profile,token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/student`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, {Profile,token},{headers: headers}).toPromise();
  }
}