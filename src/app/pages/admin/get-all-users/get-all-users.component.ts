import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { UserDto } from '../../../Dto/user-dto';

@Component({
  selector: 'app-get-all-users',
  standalone: false,
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUsersComponent implements OnInit{

  userDto:UserDto[]=[];

  ngOnInit(): void {
    this.getAllUser();
  }

  constructor(private userService:UserServiceService){}

  getAllUser() {
    this.userService.getAllUser().subscribe(
      (data) => {
        console.log('All Users:', data);
        this.userDto = data; // assuming you have a `users` property in your component
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
