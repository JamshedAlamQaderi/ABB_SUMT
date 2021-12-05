import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewAdminModel } from '../classes/new-admin-model';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  newAdminModel: INewAdminModel = {} as INewAdminModel;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.newAdminModel.userRole = '';
  }
  onCancelButtonClicked() {
    this.route.navigate(['/admin-details']);
  }
  onCreateButtonClicked() {}
}
