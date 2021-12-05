import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEditUserDetailModel } from '../classes/edit-user-detail-model';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css'],
})
export class EditUserDetailsComponent implements OnInit {
  editUserDetailModel: IEditUserDetailModel = {} as IEditUserDetailModel;
  userLevels: String[] = [];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.editUserDetailModel.selectedLevel = '';
  }

  onBackButtonClicked() {
    this.route.navigate(['/user-details']);
  }

  onSaveButtonClicked() {
    console.log('join date: ', this.editUserDetailModel.joinDate)
  }
}
