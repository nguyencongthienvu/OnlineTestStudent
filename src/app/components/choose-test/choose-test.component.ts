import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course'
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-choose-test',
  templateUrl: './choose-test.component.html',
  styleUrls: ['./choose-test.component.css']
})
export class ChooseTestComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  exam:any=[];
  Course: Course = new Course();
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) {
    this.list_data_course();
    this.pnotify = pnotifyService.getPNotify();
   }

   public takeexam()
  {
    if ($("#exam").val()) {
      this.router.navigate(['/getResult']);  
      localStorage.setItem('testid', $("#exam").val());
    } else {
      this.pnotify.error({
        text: "Vui lòng chọn bài kiểm tra",
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
     self = this;
     $('#course').select2({
       placeholder:'Chọn môn học'
     });
     $('#exam').select2({
      placeholder:'Chọn bài kiểm tra'
    });

     $('#course').on('change',function(){
      if ($("#course").val()) {
        const Info = {
          "cid": $("#course").val(),
          "token": localStorage.getItem('token'),
        }
        const token = localStorage.getItem('token');
        self.getcourse.GetExamForResult(token, Info).then((result) => {
          if(result.json().errorCode==0)
          {
            self.exam = result.json().data;
          }
          else if(result.json().status === 'fail')
          {
            self.logout();
            self.pnotify.error({
              text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
              delay:2000   
            });
          }
          else if(result.json().status==='nodata')
          {
            self.pnotify.error({
              text: "Không có dữ liệu cần xem.",
              delay:2000   
            });
            self.exam = [];
          }
        }).catch((err) => {
          console.log(err);
        });
       } else {
         this.pnotify.error({
           text: "Vui lòng chọn môn học",
           delay:2000   
         });
       }  
     });
   }

}
