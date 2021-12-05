import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-detail-card',
  templateUrl: './admin-detail-card.component.html',
  styleUrls: ['./admin-detail-card.component.css'],
})
export class AdminDetailCardComponent implements OnInit {
  @Input() adminId: string = '';
  @Input() adminUsername: String = '';
  @Input() adminRole: String = '';

  constructor() {}

  ngOnInit(): void {}

  deleteAdmin() {
    // delete admin with adminId
    console.log('deleted admin with id: ', this.adminId)
  }
}
