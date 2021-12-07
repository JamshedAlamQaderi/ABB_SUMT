import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  userLevels: String[] = ['Level-0'];
  mode: string = 'new';

  constructor(
    private router: Router,
    private notification: NotificationsService,
    private user: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editUserDetailModel.selectedLevel = '';
    
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

  loadImageToView(url: any) {
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
      formData.append('image', this.selectedProfileImage);
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
      // create new user if mode=new
      this.createNewUser(formData);
      // update user if mode=edit
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

  showWarning(value: String, title: string, msg: string) {
    if (!value || value === '') {
      this.notification.warn(title, msg, environment.noticationConfig);
    }
  }
}
