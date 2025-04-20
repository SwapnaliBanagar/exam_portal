import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(private loginService: LoginService, private router: Router) { };


  public user = { userName: '', password: '', role: '', firstName: '', lastName: '', email: '', phoneNumber: '' };

  public showPassword: boolean = false;

  togglePasswordVisibility() {                // show/Hode password
    this.showPassword = !this.showPassword;
  }




  loginFormSubmit(myLoginForm: NgForm) {   // you are tying to submit empty form then its give alert
    if (!this.user.userName || !this.user.password || !this.user.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields!',
        text: 'Please fill in all required fields before login.',
        confirmButtonText: 'OK'
      });
      console.log("empty fields")
      return;
    }

    this.loginService.loginHere(this.user).subscribe(
      (data: any) => {
        Swal.fire({                                      // this is using sweetaltert2
          icon: 'success',
          title: 'Login successfully done.....',
          text: 'now you are able to access exam portal',
          confirmButtonText: 'OK'
        });


        // Store role in local storage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', this.user.userName);
        localStorage.setItem('userRole', this.user.role);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phoneNumber', data.phoneNumber);



        // after successfully login redirect based on role
        if (this.user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
          console.log("ADMIN :", this.user.role);
        }
        else if (this.user.role === 'user') {
          this.router.navigate(['/user-dashboard']);
          console.log("USER :", this.user.role);
        }




      }, (error) => {
        if (error.status === 404) {
          Swal.fire({                                      // this is using sweetaltert2
            icon: 'error',
            title: 'Invalid user',
            text: 'Please enter valid username',
            confirmButtonText: 'Try Again'
          });
        }
        else if (error.status === 401) {
          Swal.fire({                                      // this is using sweetaltert2
            icon: 'error',
            title: 'Invalid',
            text: 'Please enter valid password and role',
            confirmButtonText: 'Try Again'
          });
        }
        console.log(" login error");
      }
    );
  }


  backButton(myLoginForm: NgForm, event?: Event) {
    if (event) {
      event.preventDefault(); // Prevents form submission when clicking "Clear"  OR stops the form
    }
    if (myLoginForm) {
      myLoginForm.resetForm();
      this.router.navigate(['']);
      console.log("back to home page");
    }
  }




}
