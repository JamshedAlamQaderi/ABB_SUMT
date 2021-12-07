import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetailCardModel } from '../classes/user-detail-card-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  searchOptions = ['Name', 'Join Date'];
  selectedSearchOption: String = '';
  userDetailCardModels: IUserDetailCardModel[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    let data: IUserDetailCardModel = {
      userId: '1',
      profileLink:
        'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?crop=entropy&cs=srgb&dl=pexels-mateus-souza-3586798.jpg&fit=crop&fm=jpg&h=959&w=640',
      steamId: '@Jamshed',
      name: 'Jamshed',
      referrer: 'Jamshed',
      country: 'Bangladesh',
      level: 'Level-0',
      joinedDate: '01/10/2021',
    };
    for (let i = 0; i < 10; i++) {
      this.userDetailCardModels.push(data);
    }
  }

  onCreateUserClick() {
    this.router.navigate(['/edit-user-details', { mode: 'new' }]);
  }
}
