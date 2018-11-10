import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileServiceService } from '../../services/profile-service.service';
import { PnotifyService } from '../../services/pnotify.service.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  token:any;
  Profile:any=[];
  pnotify = undefined;
  constructor(private auth: AuthService,private Router:Router, pnotifyService: PnotifyService,private profile:ProfileServiceService) {
    this.pnotify = pnotifyService.getPNotify();
   }
   logout()
  {
    localStorage.removeItem('token');
    localStorage.clear();
    this.Router.navigateByUrl('/login');
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
      if (token ) {
        this.profile.Profile(token).then((profiledata) => {
          
          if (profiledata.json().status === 'successfully') {
            this.Profile = profiledata.json().data[0]
          
            localStorage.setItem('std', this.Profile.stdid);
            localStorage.setItem('uid', this.Profile.uid);
            
          }
          else
          {
           this.logout(); 
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }
  backhome()
  {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
    if (token ) {
      this.auth.ensureAuthenticated(token).then((user) => {
        if (user.json().status === 'connected') {
          this.Router.navigate(['/home']);  
        }
        else
        {
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại!.",
            delay:1000
          });
         this.logout(); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
    
  }

}
