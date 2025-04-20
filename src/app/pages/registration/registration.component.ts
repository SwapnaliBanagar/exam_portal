import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  ngOnInit(): void { }

  constructor(private userService: UserServiceService, private snack: MatSnackBar, private router: Router) { }

  public user = { userName: '', password: '', role: '', firstName: '', lastName: '', email: '', phoneNumber: '' };

  public showPassword: boolean = false;


  togglePasswordVisibility() {                // show/Hode password
    this.showPassword = !this.showPassword;
  }







  formSubmit(myForm: NgForm) {   // you are tying to submit empty form then its give alert
    if (!this.user.userName || !this.user.password || !this.user.role || !this.user.firstName || !this.user.lastName || !this.user.email || !this.user.phoneNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields!',
        text: 'Please fill in all required fields before submitting.',
        confirmButtonText: 'OK'
      });
      console.log("empty fields")
      return;
    }


    // Validate phone number - must be exactly 10 digits
    if (!/^\d{10}$/.test(this.user.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number!',
        text: 'Phone number must be exactly 10 digits.',
        confirmButtonText: 'OK'
      });
      console.log("Invalid Phone Number");
      return;
    }


    // Email validation: Ensure it contains '@gmail.com'   its check compalasaly @gmail.com
    if (!this.user.email.includes('@gmail.com')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email!',
        text: 'Please enter a valid Gmail address (e.g., user@gmail.com).',
        confirmButtonText: 'OK'
      });
      console.log("Invalid Email");
      return;
    }

    this.userService.registerUser(this.user).subscribe(
      (data: any) => {

        //alert("Registration successfully done..")

        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', this.user.userName);
        localStorage.setItem('userRole', this.user.role);
        localStorage.setItem('firstName', this.user.firstName);
        localStorage.setItem('lastName', this.user.lastName);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('phoneNumber', this.user.phoneNumber);



        Swal.fire({                                      // this is using sweetaltert2
          icon: 'success',
          title: 'Registration successfully done.....',
          text: 'now you are able to login using this username and password',
          confirmButtonText: 'OK'
        });
        console.log("after registration" + data + "data.......");
        this.router.navigate(['/login']);
      },

      (error) => {
        if (error.status === 401) {
          //alert("Username already exists! Please use a different unique username.");

          Swal.fire({                                      // this is using sweetaltert2
            icon: 'error',
            title: 'Username Already Exists!',
            text: 'Please use a different unique username.',
            confirmButtonText: 'Try Again'
          });

          console.log(error.error);
        }
      }
    )
  }







  clearForm(myForm: NgForm, event?: Event) {
    if (event) {
      event.preventDefault(); // Prevents form submission when clicking "Clear"  OR stops the form
    }
    if (myForm) {
      myForm.resetForm();
    }
    console.log("Clear Form .....");

    //alert("Clear!");
    this.snack.open('Clear form..', '', {                   // this is using MatSnackBar
      duration: 3000,  // Auto close after 3 seconds
      verticalPosition: 'bottom',  // 'top' or 'bottom'
      horizontalPosition: 'center'  // 'start' | 'center' | 'end' | 'left' | 'right'
    });

  }
}
