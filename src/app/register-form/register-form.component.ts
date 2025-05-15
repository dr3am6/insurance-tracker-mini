import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']  // plural
})
export class RegisterFormComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (res) => {
        this.message = `✅ ${res}`;
        // Redirect after successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => (this.message = `❌ ${err.error}`),
    });
  }
}
