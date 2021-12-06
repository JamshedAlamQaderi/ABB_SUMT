import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private admin: AdminService, private router: Router) {}

  canActivate(): boolean {
    if (Object.keys(this.admin.myDetails).length > 0) {
      return true;
    }
    return false;
  }
}
