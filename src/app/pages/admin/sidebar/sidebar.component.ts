import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}



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
