import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { PnotifyService } from '../../services/pnotify.service.service';
declare var $:any;
var self : any;
@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  public profileList: any;
  public profileListEdit: any;
  public pnotify = undefined;

  constructor(private router: Router, private profile: ProfileServiceService, pnotifyService: PnotifyService) {
    this.getData();
    this.pnotify = pnotifyService.getPNotify();
   }

  public backhome()
  {
    this.router.navigate(['/home']);  
  }
  //dang xuat
  public logout()
  {
    this.router.navigateByUrl('/login');
  }

  private Edit()
  {
    const token = localStorage.getItem('token');
    const Profile={
     "fullname": $('#fullname').val(),
     "email":$('#email').val(),
     "sex":$('#sex').val(),
     "password":$('#password').val()
    }
    if(token == '' || token == null) 
    {
      this.logout();
    }
    else
    {
      this.profile.EditProfile(Profile,token).then((data)=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
          {
            this.pnotify.success({
              text: "Sửa Thông Tin Thành Công !",
              delay:1000
            }); 
            this.getData();

          }else if(data.json().status === 'fail')
          {
            this.logout();
            this.pnotify.error({
              text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
              delay:2000   
            });
          }
          else
          {
            this.pnotify.error({
              text: "Sửa Thông Tin Thất Bại !",
              delay:1000
            });  
          }
           }).catch((err) => {
          console.log(err);
      });
    }
  }

  //lay thong tin
  public getData() {
    const token = localStorage.getItem("token");
    this.profile.Profile(token).then((data) => {
      if (data.json().errorCode == 0 && data.json().status === 'successfully') {
        this.profileList = data.json().data[0];
        this.profileListEdit = data.json().data;
      } else if (data.json().status === 'fail') {
        this.logout();
        this.pnotify.error({
          text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
          delay:2000   
        });
      }
    })
  }

  ngOnInit() {
    $('.btn_add').click(function(){
      $('#profileedit').modal("show");
    });
  }

}
