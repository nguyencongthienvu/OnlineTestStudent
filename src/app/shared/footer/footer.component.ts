import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Profile:any=[];
  constructor(private profile:ProfileServiceService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token != '' || token != null ) 
    {
      if (token ) {
        this.profile.Profile(token).then((profiledata) => {
          
          if (profiledata.json().status === 'successfully') {
            this.Profile = profiledata.json().data[0]     
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }

}
