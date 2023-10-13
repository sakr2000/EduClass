import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {}

  async logOut() {
    await this.authService.signOut();

    this.router.navigateByUrl('/');
  }
}
