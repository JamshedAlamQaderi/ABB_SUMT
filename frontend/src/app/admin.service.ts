import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminDetailModel } from './classes/admin-detail-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  myDetails: AdminDetailModel = {} as AdminDetailModel;

  baseUrl: string = environment.apiUrl + '/admin';
  myInfoUrl: string = this.baseUrl + '/myself';

  constructor(private http: HttpClient) {}

  getMyDetail() {
    return this.http.get<any>(this.myInfoUrl);
  }
}
