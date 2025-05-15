import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router:Router) {}

  onLogin() {
    this.http.get<any[]>('http://localhost:5000/userS').subscribe({
      next: users => {
        const user = users.find(u =>
          u.username === this.username && u.password === this.password
        );

        if (user) {
          // ✅ Redirect here
          localStorage.setItem('isLoggedIn', 'true'); // ✅ REQUIRED for AuthGuard to allow access
          this.router.navigate(['/dashboard']); // change '/dashboard' to your target route
        } else {
          this.message = 'Login failed: Invalid credentials.';
        }
      },
      error: err => {
        this.message = 'Login failed: ' + err.message;
      }
    });
  }


}
