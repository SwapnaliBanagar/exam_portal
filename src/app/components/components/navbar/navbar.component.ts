import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}


  isLoggedIn(): boolean {
    return localStorage.getItem('userRole') !== null; // Check if user is logged in
  }


  logout() {
    console.log(localStorage.getItem('userRole'));
    console.log(localStorage.getItem('username'));

    Swal.fire({
      icon: 'warning',
      title: 'Log Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true, // Adds "No" button
      confirmButtonText: 'Yes', // Sets "Yes" button text
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) { 
        // ✅ Logout actions happen ONLY if user clicks "Yes"
        localStorage.removeItem('userRole'); // Remove role
        localStorage.removeItem('username'); // Remove username
        this.router.navigate(['/']); // Redirect to home page
        console.log("User logged out successfully.");
      } else {
        //  User clicked "No" — do nothing
        console.log("Logout canceled.");
      }
    });
  }

}
