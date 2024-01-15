import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'search-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent implements OnInit{
  
  constructor(private serviceUser: UserService, private formBuilder:FormBuilder){}

  users?:User[];
  form:FormGroup = this.formBuilder.group<User>({
    name:'',
    password:'',
    username:''
  });
  ngOnInit(): void {
    this.serviceUser.getUsers().subscribe(
      {
        next: (u:User[] | undefined)=>{
          console.log(u)
          this.users = u;
        },
        error:(err)=>{console.log(err)}
      })
                                      //<User>
    this.form = this.formBuilder.group<User>({
      name:'',
      password:'',
      username:''
    })
  }
  enviarData(){
    //this.form?.value
    this.serviceUser.addUser({
      name: this.form.value.name,
      password: this.form.value.password,
      username: this.form.value.username
    }).subscribe(
      respuesta =>{console.log("Comentario enviado");}
    )
  }
  borrarData(){
    this.serviceUser.deleteUser()
  }  
}
