import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { IEditUserDetailModel } from '../classes/edit-user-detail-model';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css'],
})
export class EditUserDetailsComponent implements OnInit {
  editUserDetailModel: IEditUserDetailModel = {} as IEditUserDetailModel;
  userLevels: String[] = ['Level-0'];

  constructor(
    private router: Router,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.editUserDetailModel.selectedLevel = '';
  }

  onBackButtonClicked() {
    this.router.navigate(['/user-details']);
  }

  onSaveButtonClicked() {
    this.showWarning(
      this.editUserDetailModel.joinDate,
      'Empty Field',
      'Join Date must be filled'
    );
    this.showWarning(
      this.editUserDetailModel.selectedLevel,
      'Empty Field',
      'User Level must be selected'
    );
  }

  showWarning(value: String, title: string, msg: string) {
    if (!value || value === '') {
      this.notification.warn(title, msg, environment.noticationConfig);
    }
  }
}
