import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { AdminDetailModel } from '../classes/admin-detail-model';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css'],
})
export class AdminDetailsComponent implements OnInit {
  adminDetailList: AdminDetailModel[] = [];
  constructor(
    private admin: AdminService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.showAllAdminData();
  }

  showAllAdminData() {
    this.admin.getAllAdminDetails().subscribe((res) => {
      if (res.error) {
        this.notification.error(
          'Server Error',
          res.error,
          environment.noticationConfig
        );
      } else if (res.success) {
        res.success.map((value: any) => {
          this.adminDetailList.push({
            adminId: value.id,
            adminUsername: value.username,
            adminRole: value.role,
          });
        });
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
