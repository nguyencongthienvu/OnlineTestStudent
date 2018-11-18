import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course'
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  exam:any=[];
  Course: Course = new Course();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) { 
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
  }
  
  takeexam()
  {
    if ($("#course").val()) {
      this.router.navigate(['/takeexam']);  
      localStorage.setItem('cid', $("#course").val());
    } else {
      this.pnotify.error({
        text: "Vui lòng chọn môn học",
        delay:2000   
      });
    }  
  }
backhome()
  {
    this.router.navigate(['/home']);  
  }
  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }
  list_data_course(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.GetCourse(token).then((course) => {
        if(course.json().errorCode==0)
        {
          this.course = course.json().data;
        }
        else if(course.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(course.json().status==='nodata')
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
    $('#course').select2({
      placeholder:'Chọn môn thi'
    });
  }

}
