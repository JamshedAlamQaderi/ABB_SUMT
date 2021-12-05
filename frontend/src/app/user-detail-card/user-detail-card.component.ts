import { Component, Input, OnInit } from '@angular/core';
import { IUserDetailCardModel } from '../classes/user-detail-card-model';

@Component({
  selector: 'app-user-detail-card',
  templateUrl: './user-detail-card.component.html',
  styleUrls: ['./user-detail-card.component.css'],
})
export class UserDetailCardComponent implements OnInit {
  @Input() userDetailModel: IUserDetailCardModel = {} as IUserDetailCardModel;
  constructor() {}

  ngOnInit(): void {}

  onEditClicked() {
    console.log('Edit button clicked: ', this.userDetailModel.userId);
  }

  onDeleteClicked() {
    console.log('delete button clicked: ', this.userDetailModel.userId);
  }
}
