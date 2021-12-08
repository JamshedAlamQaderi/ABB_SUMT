import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { IEditUserDetailModel } from '../classes/edit-user-detail-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css'],
})
export class EditUserDetailsComponent implements OnInit {
  editUserDetailModel: IEditUserDetailModel | any = {} as IEditUserDetailModel;
  profileImage: ArrayBuffer | null | undefined | string = null;
  selectedProfileImage: any = null;
  userLevels: String[] = [];
  mode: string = 'new';

  constructor(
    private router: Router,
    private notification: NotificationsService,
    private user: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createUserLevels();
    this.editUserDetailModel.selectedLevel = '';
    this.route.paramMap.subscribe((params: ParamMap) => {
      let mode = params.get('mode');
      let userId = params.get('userId');
      if (mode == 'edit') {
        this.mode = 'edit';
        if (userId) {
          console.log('userid: ' + userId);
          this.loadUserData(userId);
        } else {
          this.notification.error(
            'Data Error',
            'User not found on server',
            environment.noticationConfig
          );
          setTimeout(() => this.location.back(), 2000);
        }
      } else {
        this.mode = 'new';
      }
    });
  }

  createUserLevels() {
    this.userLevels.push(
      ...[
        'level-1',
        'level-2',
        'level-3',
        'level-4',
        'level-5',
        'active-list',
        'superactive-list',
      ]
    );
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
            date.getFullYear() +
            '-' +
            (date.getMonth() < 10 ? '0' : '') +
            date.getMonth() +
            '-' +
            (date.getDate() < 10 ? '0' : '') +
            date.getDate();
          this.loadImageToView(
            this.user.bindImageToUrl(userData.profile),
            true
          );
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

  onBackButtonClicked() {
    this.router.navigate(['/user-details']);
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedProfileImage = event.target.files[0];
      this.loadImageToView(event.target.files[0]);
    }
  }

  loadImageToView(url: any, fromWeb: boolean = false) {
    if (fromWeb) {
      this.profileImage = url;
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = (e) => {
      this.profileImage = e.target?.result;
    };
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
    if (
      this.editUserDetailModel.joinDate &&
      this.editUserDetailModel.selectedLevel &&
      this.editUserDetailModel.joinDate !== '' &&
      this.editUserDetailModel.selectedLevel !== ''
    ) {
      let formData = new FormData();
      if (this.selectedProfileImage !== null) {
        formData.append('image', this.selectedProfileImage);
      }
      formData.append('name', this.editUserDetailModel.name || '');
      formData.append('address', this.editUserDetailModel.address || '');
      formData.append('country', this.editUserDetailModel.country || '');
      formData.append('referrer', this.editUserDetailModel.referrer || '');
      formData.append(
        'steamitId',
        this.editUserDetailModel.steamitUserId || ''
      );
      formData.append(
        'introPostLink',
        this.editUserDetailModel.introPostLink || ''
      );
      formData.append(
        'impoPostLink',
        this.editUserDetailModel.impoPostLink || ''
      );
      formData.append(
        'negComment',
        this.editUserDetailModel.negativeComment || ''
      );
      formData.append(
        'adminSpecialComment',
        this.editUserDetailModel.adminSpecialComment || ''
      );
      formData.append(
        'modSpecialComment',
        this.editUserDetailModel.moderatorSpecialComment || ''
      );
      formData.append('joinDate', this.editUserDetailModel.joinDate || '');
      formData.append(
        'userLevel',
        this.editUserDetailModel.selectedLevel || ''
      );

      // update user if mode=edit
      if (this.mode == 'edit') {
        formData.append('id', this.editUserDetailModel.userId);
        this.updateUserData(formData);
      } else {
        // create new user if mode=new
        this.createNewUser(formData);
      }
    } else {
      this.notification.error(
        'Form Error',
        'Please select user level & join date',
        environment.noticationConfig
      );
    }
  }

  createNewUser(formData: FormData) {
    this.user.createNewUser(formData).subscribe((res: any) => {
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
        this.notification.info(
          'Redirect',
          'Redirecting to UserDetails page',
          environment.noticationConfig
        );
        this.editUserDetailModel = {};
        setTimeout(() => {
          this.router.navigate(['/user-details']);
        }, 2000);
      } else {
        this.notification.error(
          'Unknow Error',
          'Unknow error found! please contact with technician',
          environment.noticationConfig
        );
      }
    });
  }

  updateUserData(formData: FormData) {
    if (
      this.editUserDetailModel.userId &&
      this.editUserDetailModel.userId !== ''
    ) {
      this.user
        .updateUserById(this.editUserDetailModel.userId, formData)
        .subscribe((res) => {
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
          } else {
            this.notification.error(
              'Unknow Error',
              'Unknow error found! please contact with technician',
              environment.noticationConfig
            );
          }
        });
    } else {
      this.notification.error(
        'Invalid Error',
        'No userId found to update the user data',
        environment.noticationConfig
      );
    }
  }

  showWarning(value: String, title: string, msg: string) {
    if (!value || value === '') {
      this.notification.warn(title, msg, environment.noticationConfig);
    }
  }
}
