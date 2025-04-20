import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {


  currentUser: any = {};



  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();           // store data
  }


   getCurrentUser() {                 // get data
    const currentUser = {
      
      userId:localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('userRole'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email'),
        phoneNumber: localStorage.getItem('phoneNumber')
    };

    console.log(currentUser);
    return currentUser;
}

}
