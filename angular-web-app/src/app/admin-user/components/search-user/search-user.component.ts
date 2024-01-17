import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';


@Component({
  selector: 'search-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent implements OnInit{
  
  constructor(private router:Router ,private serviceUser: UserService, private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      id:['',Validators.required]
    })
    
  }
  users?:User[];
  form:FormGroup;
  ngOnInit(): void {
    this.listarData();
    
  }
  listarData(){
    this.serviceUser.getUsers().subscribe(
      {
        next: (u:User[] | undefined)=>{
          console.log(u)
          this.users = u;
        },
        error:(err)=>{console.log(err)}
      })
  }
  listByID(id:number){
    const currentID:string = id.toString()
    this.serviceUser.getUserByID(currentID).subscribe(data => {
      this.users = data;
    })
  }

  borrarData(id:number | undefined){
    if(id){
      const currentUserId:string = id.toString()
      this.serviceUser.deleteUser(currentUserId).pipe(first()).subscribe(data=>{
        this.listarData()
      })
    }else{
      alert("El ID no existe")
    }
    
  }  
}
