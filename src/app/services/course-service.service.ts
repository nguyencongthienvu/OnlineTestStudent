import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
import { Course } from '../models/course';
@Injectable()
export class CourseServiceService {
private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  GetCourse(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/course/courseforstudent`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  Takeexam(Course:Course,token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/test/takeexam`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Course,{headers: headers}).toPromise();
  }
  GetAll(Course:Course,token)
  {
    let url: string = `${this.url.BASE_URL}/question/findall`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Course,{headers: headers}).toPromise();
  }
  getStudentAnswer(Data,token) {
    let url: string = `${this.url.BASE_URL}/question/stdanswer`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Data,{headers: headers}).toPromise();
  }
  updateStudentAnswer(Data, Value, token) {
    let url: string = `${this.url.BASE_URL}/question/updateAnswer`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{Data,Value},{headers: headers}).toPromise();
  }
  Result(Course:Course,data,answer,token)
  {
    let url: string = `${this.url.BASE_URL}/test/result`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{Course, data, answer},{headers: headers}).toPromise();
  }
  getReport(Data,token)
  {
    let url: string = `${this.url.BASE_URL}/test/getAnswer`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Data,{headers: headers}).toPromise();
  }
  getDetailReport(Data,token)
  {
    let url: string = `${this.url.BASE_URL}/test/getDetailAnswer`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Data,{headers: headers}).toPromise();
  }
  GetTimeAndInfo(token, Info)
  {
    let url: string = `${this.url.BASE_URL}/question/takeInfo`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Info,{headers: headers}).toPromise();
  }

  GetExamForResult(token, Info)
  {
    let url: string = `${this.url.BASE_URL}/test/chooseExam`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Info,{headers: headers}).toPromise();
  }

}
