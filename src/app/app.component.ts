import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }

  // Handle the logout functionality
  logout(): void {
  }

  // Get the authentication status
  isAuthenticated(): boolean {
    return false;
  }
}
