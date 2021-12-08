import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { IPageButton } from '../classes/page-button';
import { ISearchOption } from '../classes/search-option';
import { IUserCount } from '../classes/user-count';
import { IUserDetailCardModel } from '../classes/user-detail-card-model';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  searchOptions: any = [];
  searchOption: ISearchOption = {} as ISearchOption;
  userDetailCardModels: IUserDetailCardModel[] = [];
  userCount: IUserCount = { totalUsers: 0, totalPage: 0, currentPage: 0 };
  pageBtn: IPageButton = {} as IPageButton;

  constructor(
    private router: Router,
    private user: UserService,
    private notification: NotificationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.searchOption.pageNo = params.get('pageNo') || '0';
      this.searchOption.searchText = params.get('searchText') || '';
      this.searchOption.colName = params.get('colName') || 'id';
      this.loadUserList();
    });
    this.createSearchOptions();
  }

  loadUserList() {
    this.user.getTotalUsers(this.searchOption).subscribe((res: any) => {
      if (res.error) {
        this.notification.error(
          'Server Error',
          res.error,
          environment.noticationConfig
        );
      } else if (res.success) {
        this.notification.success(
          'Success',
          'Successfully retrieved totalUsers',
          environment.noticationConfig
        );
        this.userCount.totalUsers = parseInt(res.success.count);
        let pageNo = parseInt(this.searchOption.pageNo as string);
        this.userCount.currentPage = pageNo + 1;
        this.userCount.totalPage = Math.ceil(
          this.userCount.totalUsers / parseInt(res.success.content_per_page)
        );

        let totalPage = this.userCount.totalPage;
        let currentPageNo = this.userCount.currentPage;
        if (currentPageNo == totalPage) {
          this.pageBtn.buttonOne = (currentPageNo - 2).toString();
          this.pageBtn.buttonTwo = (currentPageNo - 1).toString();
          this.pageBtn.buttonThree = currentPageNo.toString();
          this.pageBtn.previousButton = this.pageBtn.buttonTwo;
        }else if(currentPageNo >=3){
          //do something
        }
      } else {
        this.notification.error(
          'Unknow Error',
          'Unknow error found on totalUsersCount! please contact with technician',
          environment.noticationConfig
        );
      }
    });
    this.user.getUserList(this.searchOption).subscribe((res: any) => {
      if (res.error) {
        this.notification.error(
          'Server Error',
          res.error,
          environment.noticationConfig
        );
      } else if (res.success) {
        this.userDetailCardModels = [];
        for (let item of res.success) {
          let date = new Date(item.join_date);
          let joinDate =
            date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
          this.userDetailCardModels.push({
            userId: item.id,
            name: item.name,
            steamId: item.steamit_id,
            level: item.user_level,
            joinedDate: joinDate,
            referrer: item.referrer,
            country: item.country,
            profileLink: this.user.bindImageToUrl(item.profile),
          });
        }
      } else {
        this.notification.error(
          'Unknow Error',
          'Unknow error found on getUserList! please contact with technician',
          environment.noticationConfig
        );
      }
    });
  }

  createSearchOptions() {
    this.searchOptions.push({ text: 'Name', value: 'name' });
    this.searchOptions.push({ text: 'Address', value: 'address' });
    this.searchOptions.push({ text: 'Country', value: 'country' });
    this.searchOptions.push({ text: 'Steait ID', value: 'steamit_id' });
    this.searchOptions.push({ text: 'Referrer', value: 'referrer' });
    this.searchOptions.push({ text: 'Join Date', value: 'join_date' });
    this.searchOptions.push({
      text: 'Introduction Post Link',
      value: 'intro_post_link',
    });
    this.searchOptions.push({
      text: 'Important Post Link',
      value: 'important_post_link',
    });
    this.searchOptions.push({
      text: 'Spam Comment',
      value: 'negative_comment',
    });
    this.searchOptions.push({
      text: 'Admin Special Comment',
      value: 'admin_special_comment',
    });
    this.searchOptions.push({
      text: 'Moderator Special Comment',
      value: 'moderator_special_comment',
    });
    this.searchOptions.push({ text: 'User Level', value: 'user_level' });
  }

  onSearchEnterKeyPressed() {
    this.router.navigate(['user-details', this.searchOption]);
  }

  onCreateUserClick() {
    this.router.navigate(['/edit-user-details', { mode: 'new' }]);
  }
}
