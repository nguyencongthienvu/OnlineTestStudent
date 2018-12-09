import { Component, OnInit, HostListener  } from '@angular/core';
import { CourseServiceService } from '../../services/course-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service.service';
import { Course } from '../../models/course';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-get-result',
  templateUrl: './get-result.component.html',
  styleUrls: ['./get-result.component.css']
})
export class GetResultComponent implements OnInit {
  pnotify = undefined;
  course:any =[];
  exam:any=[];
  Course: Course = new Course();
  info: any = [];
  marksum:any=0;
  result:any=[];
  public answer: any = [];
  public pager: any = {};
  // paged items
  public pagedItems: any[];
  public answerPager: any = {};
  public pagedAnser: any[];
  constructor(private router: Router,private getcourse: CourseServiceService, pnotifyService: PnotifyService) {
    this.list_data_exam();
    this.listsReport();
    this.pnotify = pnotifyService.getPNotify();
   }

   backhome()
  {
    localStorage.removeItem("testid");
    localStorage.removeItem("cid");
    localStorage.removeItem("test");
    this.router.navigate(['/home']);  
  }
  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }

   list_data_exam(){
    this.Course ={
      "testid": localStorage.getItem('testid'),
      "token": localStorage.getItem("token"),
    }
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      
      this.getcourse.getReport(this.Course,token).then((result) => {
        if(result.json().errorCode==0)
        {
          this.exam = result.json().data[0];
          if (this.exam.marks >=8.5) {
            this.info = "A";
          } else if (this.exam.marks >= 7.5 && this.exam.marks < 8.5) {
            this.info = "B+";
          } else if  (this.exam.marks >= 7 && this.exam.marks < 7.5) {
            this.info = "B";
          } else if  (this.exam.marks >= 6.5 && this.exam.marks < 7) {
            this.info = "C+";
          } else if  (this.exam.marks >= 6 && this.exam.marks < 6.5) {
            this.info = "C";
          } else if  (this.exam.marks >= 5 && this.exam.marks < 6) {
            this.info = "D+";
          } else if  (this.exam.marks >= 4 && this.exam.marks < 5) {
            this.info = "D";
          } else {
            this.info = "F";
          }
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

listsReport(){
  this.Course ={
    "testid": localStorage.getItem('testid'),
    "token": localStorage.getItem("token"),
  }
  const token = localStorage.getItem('token');
  if(token == '' || token == null)
  {
    this.logout();
  }else{
  if (token) {
    
    this.getcourse.getDetailReport(this.Course,token).then((result) => {
      if(result.json().errorCode==0)
      {
        this.result = result.json().data;
        // tbl.clear().draw();
        // tbl.rows.add(this.result); // Add new data
        // tbl.columns.adjust().draw();
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

  ngOnInit() {
    self = this;
    setTimeout(function(){
      self.initTable();
     }, 1000);
    }

    private initTable(){
      tbl = $("#dataTable").DataTable({
        aLengthMenu: [
          [5],
          [5]
        ],
        language: {
          "sProcessing":   "Đang xử lý...",
          "sLengthMenu":   "Xem _MENU_ mục",
          "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
          "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
          "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
          "sInfoFiltered": "(được lọc từ _MAX_ mục)",
          "sInfoPostFix":  "",
          "sSearch":       "Tìm:",
          "sUrl":          "",
          "oPaginate": {
              "sFirst":    "Đầu",
              "sPrevious": "Trước",
              "sNext":     "Tiếp",
              "sLast":     "Cuối"
          }
        },
        iDisplayLength: 5,
        // rowId: "qnid",
        // columns: [
        //   { data: null},
        //   { data: "question" },  
        //   { data: "mark" },            
        //   { data: "stdanswer" },
        //   { data: "correctanswer" },
        //   { data: "stdanswer;correctanswer" ,render: function ( data, a ) {
        //     return data;
        //   }
        //   },
        // ],
        initComplete: function (settings, json) {
          //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
        },
        drawCallback: function( settings ) {
          // self.bindTableEvents();
        }
      });
  
      tbl.on('order.dt search.dt', function () {
        tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
      }).draw(); 
    }
  }
