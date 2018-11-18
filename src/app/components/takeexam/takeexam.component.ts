import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course'
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-takeexam',
  templateUrl: './takeexam.component.html',
  styleUrls: ['./takeexam.component.css']
})
export class TakeexamComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  exam:any=[];
  testcode:any=[]
  Course: Course = new Course();
  Course2:Course = new Course();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) {
    this.list_data_exam();
    this.pnotify = pnotifyService.getPNotify();
   }
   Exam()
  {
    this.testcode = $("#testcode").val()
    this.Course ={
      "cid": localStorage.getItem('cid'),
       "uid": localStorage.getItem('uid')
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.Takeexam(this.Course,token).then((exam) => {
        if(exam.json().errorCode==0)
        {
          this.exam = exam.json().data[0];
          if(this.testcode == this.exam.code)
          {
            localStorage.setItem('testid',this.exam.testid)
            this.router.navigateByUrl('/doexam');
          }
        }
        else if(exam.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(exam.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }
  backhome()
  {
    this.router.navigate(['/home']);  
    localStorage.removeItem("cid");
  }
  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }
  list_data_exam(){
    this.Course ={
      "cid": localStorage.getItem('cid'),
       "uid": localStorage.getItem('uid')
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.Takeexam(this.Course,token).then((exam) => {
        if(exam.json().errorCode==0)
        {
          this.exam = exam.json().data[0];
        }
        else if(exam.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(exam.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
  ngOnInit() {
  }

}
