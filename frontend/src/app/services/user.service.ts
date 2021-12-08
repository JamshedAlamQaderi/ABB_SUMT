import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISearchOption } from '../classes/search-option';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl + '/user';
  profileImgUrl: string = environment.apiUrl + '/profile_image';
  createUserUrl: string = this.baseUrl + '/create_user';
  userDataUrl: string = this.baseUrl + '/user/';
  userCountUrl: string = this.baseUrl + '/user_count';
  updateUserUrl: string = this.baseUrl + '/update_user/';
  userListUrl: string = this.baseUrl + '/userlist';
  deleteUserUrl: string = this.baseUrl + '/delete/';
  constructor(private http: HttpClient) {}

  createNewUser(formData: FormData) {
    return this.http.post(this.createUserUrl, formData);
  }

  getUserDataById(id: any) {
    return this.http.get<any>(this.userDataUrl + id);
  }

  updateUserById(id: any, formData: FormData) {
    return this.http.post<any>(this.updateUserUrl + id, formData);
  }

  getUserList(param: ISearchOption) {
    let encoded = encodeURI(
      this.userListUrl +
        '?page_no=' +
        param.pageNo +
        '&search_text=' +
        param.searchText +
        '&col_name=' +
        param.colName
    );
    return this.http.get(encoded);
  }

  deleteUser(id: any) {
    return this.http.get(this.deleteUserUrl + id);
  }

  getTotalUsers(param: ISearchOption) {
    let encoded = encodeURI(
      this.userCountUrl +
        '?search_text=' +
        param.searchText +
        '&col_name=' +
        param.colName
    );
    return this.http.get(encoded);
  }

  bindImageToUrl(imgFilename: string) {
    return this.profileImgUrl + '/' + imgFilename;
  }
}
