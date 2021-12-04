import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userRole: String = '';
  constructor() {}

  ngOnInit(): void {
    //api call for check is admin or moderator
    this.userRole = 'ADMIN'
  }
}
