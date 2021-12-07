import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminDetailModel } from '../classes/admin-detail-model';
import { IChangePassword } from '../classes/change-password';
import { INewAdminModel } from '../classes/new-admin-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  myDetails: AdminDetailModel = {} as AdminDetailModel;

  baseUrl: string = environment.apiUrl + '/admin';
  myInfoUrl: string = this.baseUrl + '/myself';
  changePasswordUrl: string = this.baseUrl + '/update_password';
  allAdminDetailsUrl: string = this.baseUrl + '/all';
  adminDeleteUrl: string = this.baseUrl + '/delete';
  createAccountUrl: string = this.baseUrl + '/create';

  constructor(private http: HttpClient) {}

  getMyDetail() {
    return this.http.get<any>(this.myInfoUrl);
  }

  changePassword(model: IChangePassword) {
    return this.http.post<any>(this.changePasswordUrl, {
      old_password: model.currentPassword,
      new_password: model.newPassword,
    });
  }

  getAllAdminDetails() {
    return this.http.get<any>(this.allAdminDetailsUrl);
  }

  deleteAdmin(adminId: string) {
    return this.http.get<any>(this.adminDeleteUrl + '/' + adminId);
  }

  createAdminAccount(adminInfo: INewAdminModel) {
    return this.http.post<any>(this.createAccountUrl, {
      username: adminInfo.username,
      password: adminInfo.password,
      role: adminInfo.userRole,
    });
  }
}
