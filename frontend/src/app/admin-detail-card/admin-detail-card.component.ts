import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-detail-card',
  templateUrl: './admin-detail-card.component.html',
  styleUrls: ['./admin-detail-card.component.css'],
})
export class AdminDetailCardComponent implements OnInit {
  @Input() adminId: string = '';
  @Input() adminUsername: String = '';
  @Input() adminRole: String = '';
  currentAdminRole: String = '';

  constructor(
    private admin: AdminService,
    private router: Router,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.currentAdminRole = this.admin.myDetails.adminRole.toLowerCase();
  }

  deleteAdmin() {
    // delete admin with adminId
    console.log('deleted admin with id: ', this.adminId);
    this.admin.deleteAdmin(this.adminId).subscribe((res) => {
      if (res.error) {
        this.notification.error(
          'Authorize Error',
          res.error,
          environment.noticationConfig
        );
      } else if (res.success) {
        this.notification.success(
          'Success',
          res.success,
          environment.noticationConfig
        );
        this.reloadCurrentRoute();
      } else {
        this.notification.error(
          'Unknow Error',
          'Unknow error found! please contact with technician',
          environment.noticationConfig
        );
      }
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
