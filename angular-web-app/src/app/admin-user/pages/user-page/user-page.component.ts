import { Component } from '@angular/core';
import { SearchUserComponent } from '../../components/search-user/search-user.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [SearchUserComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class AdminUserPageComponent {

}
