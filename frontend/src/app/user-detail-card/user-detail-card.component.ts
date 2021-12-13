import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { IUserDetailCardModel } from '../classes/user-detail-card-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail-card',
  templateUrl: './user-detail-card.component.html',
  styleUrls: ['./user-detail-card.component.css'],
})
export class UserDetailCardComponent implements OnInit {
  @Input() userDetailModel: IUserDetailCardModel = {} as IUserDetailCardModel;
  constructor(
    private router: Router,
    private user: UserService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {}

  onShowClicked() {
    this.router.navigate([
      '/show-user-details',
      { userId: this.userDetailModel.userId },
    ]);
  }

  onEditClicked() {
    this.router.navigate([
      '/edit-user-details',
      { mode: 'edit', userId: this.userDetailModel.userId },
    ]);
  }

  onDeleteClicked() {
    this.user.deleteUser(this.userDetailModel.userId).subscribe((res: any) => {
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
        setTimeout(() => this.reloadCurrentRoute(), 2000);
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
