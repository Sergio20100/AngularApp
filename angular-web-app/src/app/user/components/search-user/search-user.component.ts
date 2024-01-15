import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'search-user',
  standalone: true,
  imports: [],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent implements OnInit{
  
  constructor(private serviceUser: UserService){}

  user?:User;
  ngOnInit(): void {
    this.serviceUser.getUsers().subscribe(
      {
        next: (u:User | undefined)=>{
          console.log(u)
          this.user = u;
        },
        error:(err)=>{console.log(err)}
      }
    )
  }  
}
