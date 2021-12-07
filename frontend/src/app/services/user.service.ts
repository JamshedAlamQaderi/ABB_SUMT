import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl + '/user';
  createUserUrl: string = this.baseUrl + '/create_user';

  constructor(private http: HttpClient) {}

  createNewUser(formData: FormData) {
    return this.http.post(this.createUserUrl, formData);
  }
}
