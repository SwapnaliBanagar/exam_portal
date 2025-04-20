import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesDto } from '../../../Dto/categories-dto';
import { CategoryService } from '../../../services/category.service';
import { MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  standalone: false,
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent{

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
