import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
    angForm:FormGroup;

    constructor(private formBuilder: FormBuilder, private route:Router, private serviceUser: UserService,){
      this.angForm = this.formBuilder.group({
        name:['',Validators.required],
        password:['',Validators.required],
        username:['',Validators.required]
      })
    }
    postdata(form:any){
      console.log(this.angForm.value)
      this.serviceUser.addUser({
        name: this.angForm.value.name,
        password: this.angForm.value.password,
        username: this.angForm.value.username
      }).pipe(first()).subscribe(data=>{
        this.route.navigate(['home'])
      })
    }
  }
