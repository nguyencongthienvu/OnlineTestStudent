import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-doexam',
  templateUrl: './doexam.component.html',
  styleUrls: ['./doexam.component.css']
})
export class DoexamComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  exam:any=[];
  Course: Course = new Course();
  d:any={};
  e:any=[];
  a:any=[];
  marksum:any=0;
  result:any=[];
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) {
    this.list_data_exam();
    this.pnotify = pnotifyService.getPNotify();
    
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
  save(value,name)
  {
    var qnid = name;
    var option = value;
    this.d = {qnid,option}
    this.e.push(this.d);
    this.e.sort((a,b) => a.qnid - b.qnid) 
  }
  mark(haha)
  {
    for(var i = 0, j =0;i<this.exam.length&& j<this.exam.length;i++,j++)
    { 
      if(haha.value[i + 1] == this.exam[j].correctanswer)
      {
        this.marksum += parseInt(this.exam[j].mark); 
        console.log(this.marksum)
      }
      else
      {
        this.marksum +=0;
      }

    }
    this.Course ={
      "stdid": localStorage.getItem('std'),
      "cid": localStorage.getItem('cid'),
      "uid": localStorage.getItem('uid'),
      "testid": localStorage.getItem('testid'),
      "marks":this.marksum,
      "testdate":new Date()
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.Result(this.Course,token).then((result) => {
        if(result.json().errorCode==0)
        {
          this.result = result.json().data;
          this.pnotify.success({
            text:"điểm của bạn là: "+this.marksum,
            delay: 15000
          })
          this.router.navigate(['/home']);
        }
        else if(result.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(result.json().status==='nodata')
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
  list_data_exam(){
    this.Course ={
      "testid": localStorage.getItem('testid'),
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.GetAll(this.Course,token).then((exam) => {
        if(exam.json().errorCode==0)
        {
          this.exam = exam.json().data;
          
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
