import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { INewAdminModel } from '../classes/new-admin-model';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  newAdminModel: INewAdminModel = {} as INewAdminModel;
  constructor(
    private router: Router,
    private notification: NotificationsService,
    private admin: AdminService
  ) {}

  ngOnInit(): void {
    this.newAdminModel.userRole = '';
  }
  onCancelButtonClicked() {
    this.router.navigate(['/admin-details']);
  }

  onCreateButtonClicked() {
    if (!this.newAdminModel.username || this.newAdminModel.username === '') {
      this.notification.warn(
        'Empty field',
        'username must be filled',
        environment.noticationConfig
      );
    }
    if (!this.newAdminModel.password || this.newAdminModel.password === '') {
      this.notification.warn(
        'Empty field',
        'confirm password must be filled',
        environment.noticationConfig
      );
    }
    if (
      !this.newAdminModel.confirmPassword ||
      this.newAdminModel.confirmPassword === ''
    ) {
      this.notification.warn(
        'Empty field',
        'confirm password must be filled',
        environment.noticationConfig
      );
    }
    if (!this.newAdminModel.userRole || this.newAdminModel.userRole === '') {
      this.notification.warn(
        'Empty field',
        'User role must be selected',
        environment.noticationConfig
      );
    }
    if (
      !this.newAdminModel.password ||
      !this.newAdminModel.confirmPassword ||
      this.newAdminModel.password !== this.newAdminModel.confirmPassword
    ) {
      this.notification.warn(
        'Mismatch',
        "Password & Confirm Password field don't match",
        environment.noticationConfig
      );
    }
    if (
      this.newAdminModel.username &&
      this.newAdminModel.password &&
      this.newAdminModel.confirmPassword &&
      this.newAdminModel.userRole &&
      this.newAdminModel.username !== '' &&
      this.newAdminModel.password !== '' &&
      this.newAdminModel.confirmPassword !== '' &&
      this.newAdminModel.userRole !== '' &&
      this.newAdminModel.password === this.newAdminModel.confirmPassword
    ) {
      this.admin.createAdminAccount(this.newAdminModel).subscribe((res) => {
        if (res.error) {
          this.notification.error(
            'Server Error',
            res.error,
            environment.noticationConfig
          );
        } else if (res.success) {
          this.notification.success(
            'Success',
            res.success,
            environment.noticationConfig
          );
          this.router.navigate(['/admin-details']);
        } else {
          this.notification.error(
            'Unknow Error',
            'Unknow error found! please contact with technician',
            environment.noticationConfig
          );
        }
      });
    }
  }
}
