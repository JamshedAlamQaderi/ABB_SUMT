import { Component, OnInit } from '@angular/core';
import { AdminDetailModel } from '../classes/admin-detail-model';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css'],
})
export class AdminDetailsComponent implements OnInit {
  adminDetailList: AdminDetailModel[] = [];
  constructor() {}

  ngOnInit(): void {
      for(let i =0; i<10; i++){
        this.adminDetailList.push({adminId:`${i}`, adminUsername:'Jamshed Alam', adminRole:'Admin'})
      }
  }
}
