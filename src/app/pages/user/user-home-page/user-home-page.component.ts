import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home-page',
  standalone: false,
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css'
})
export class UserHomePageComponent implements OnInit {


  pastTwoMonths: { date: Date; status: 'present' | 'absent' }[] = [];

  ngOnInit(): void {
    
  }

  attendanceData = [
    { date: new Date(2025, 1, 1), status: 'present' },
    { date: new Date(2025, 1, 2), status: 'absent' },
    { date: new Date(2025, 1, 3), status: 'present' },
    { date: new Date(2025, 1, 4), status: 'absent' },
    { date: new Date(2025, 1, 5), status: 'present' },
    // ...add more as needed
  ];
  
  user = {
    username: 'swapnali',
    role: 'USER',
    status: 'Active',
    lastLogin: new Date()
  };
  
}
