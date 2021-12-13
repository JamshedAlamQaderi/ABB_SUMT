import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { IEditUserDetailModel } from '../classes/edit-user-detail-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css'],
})
export class ShowUserDetailsComponent implements OnInit {
  editUserDetailModel: IEditUserDetailModel = {} as IEditUserDetailModel;
  profileImageUrl: string = '';

  constructor(
    private notification: NotificationsService,
    private user: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let userId = params.get('userId');
      if (userId) {
        this.loadUserData(userId);
      } else {
        this.notification.error(
          'Data Error',
          'User not found on server',
          environment.noticationConfig
        );
        setTimeout(() => this.location.back(), 2000);
      }
    });
  }

  onEditClicked() {
    this.router.navigate([
      '/edit-user-details',
      { mode: 'edit', userId: this.editUserDetailModel.userId },
    ]);
  }

  onBackClicked() {
    this.location.back();
  }

  loadUserData(id: any) {
    this.user.getUserDataById(id).subscribe((res) => {
      if (res.error) {
        this.notification.error(
          'Server Error',
          res.error,
          environment.noticationConfig
        );
      } else if (res.success) {
        let userData = res.success;
        if (Object.keys(userData).length > 0) {
          let date = new Date(userData.join_date);
          let joinDate =
            (date.getDate() < 10 ? '0' : '') +
            date.getDate() +
            '/' +
            (date.getMonth() < 10 ? '0' : '') +
            date.getMonth() +
            '/' +
            date.getFullYear();
          this.profileImageUrl = this.user.bindImageToUrl(userData.profile);
          this.editUserDetailModel = {
            userId: userData.id,
            name: userData.name,
            address: userData.address,
            country: userData.country,
            steamitUserId: userData.steamit_id,
            referrer: userData.referrer,
            joinDate: joinDate,
            introPostLink: userData.intro_post_link,
            impoPostLink: userData.important_post_link,
            negativeComment: userData.negative_comment,
            adminSpecialComment: userData.admin_special_comment,
            moderatorSpecialComment: userData.moderator_special_comment,
            selectedLevel: userData.user_level,
            selectedActiveList: userData.active_list,
            selectedSuperActiveList: userData.super_active_list,
            selectedUnderAdminMod: userData.under_admin_mod,
          };
        } else {
          this.notification.error(
            'Data Error',
            'User data is invalid',
            environment.noticationConfig
          );
        }
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
