import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course';
import { PaginationService } from "../../services/pagination.service";
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
  info: any = [];
  d:any={};
  e:any=[];
  a:any=[];
  marksum:any=0;
  result:any=[];
  public answer: any = [];
  public pager: any = {};
  // paged items
  public pagedItems: any[];
  public answerPager: any = {};
  public pagedAnser: any[];
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService, private pagerService: PaginationService,) {
    this.list_data_exam();
    this.pnotify = pnotifyService.getPNotify();
    this.getTimeAndInfo();
    
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

  mark(data)
  {
    for(var i = 0, j =0;i<this.exam.length&& j<this.answer.length;i++,j++)
    { 
      if(data[i].correctanswer == this.answer[j].stdanswer)
      {
        this.marksum += parseInt(this.exam[j].mark); 
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

  public updateAnswer(value, data) {
    const token = localStorage.getItem("token");
    this.getcourse.updateStudentAnswer(data, value, token).then((success) => {
      
    }, (error) => {
      console.log(error);
    })
  }

  public getTime(info) {
    self = this;
    var countDownDate = new Date(info.testto).getTime();

    // Update the count down every 1 second
      var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
      // If the count down is finished, write some text 
      if (distance == 0 || distance < 0 ) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        localStorage.clear();
        self.logout();
      } else if (distance < 1200000 && distance > 420000) {
        document.getElementById("message").innerHTML = "SẮP HẾT THỜI GIAN.VUI LÒNG ĐÁNH DẤU CÁC CÂU VÀ ẤN GỬI!";
      } else if (distance < 420000 && distance >0) {
        document.getElementById("message").innerHTML = "GẦN HẾT THỜI GIAN.VUI LÒNG KIỂM TRA TRƯỚC KHI HẾT THỜI GIAN!";
      }
    }, 1000);
  }

  list_data_exam(){
    this.Course ={
      "testid": localStorage.getItem('testid'),
      "token": localStorage.getItem("token"),
      "uid": localStorage.getItem("uid"),
    }
    const Data = {
      "testid": localStorage.getItem('testid'),
      "token": localStorage.getItem("token"),
      "uid": localStorage.getItem("uid"),
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
          this.getcourse.getStudentAnswer(Data, token).then((result)=>{
            this.answer = result.json().data;
            this.setPage(1);
          })
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

public setPage(page: number) {
  // get pager object from service
  this.pager = this.pagerService.getPager(this.exam.length, page);
  this.answerPager = this.pagerService.getPager(this.answer.length, page);
  // get current page of items
  this.pagedItems = this.exam.slice(this.pager.startIndex, this.pager.endIndex + 1);
  this.pagedAnser = this.answer.slice(this.answerPager.startIndex, this.answerPager.endIndex + 1);
}

public getTimeAndInfo() {
  const Info ={
    "testid": localStorage.getItem('testid'),
    "token": localStorage.getItem('token')
  }
  const token = localStorage.getItem('token');
  if (token) {
    
    this.getcourse.GetTimeAndInfo(token, Info).then((info) => {
      if(info.json().errorCode==0)
      {
        this.info = info.json().data[0];
        this.getTime(this.info);
        
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}

  ngOnInit() {
  }

}
