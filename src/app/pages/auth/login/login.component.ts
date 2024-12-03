import { Component, inject } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;

  // Injections
  authService = inject(AuthService)
  router = inject(Router)
  errorAlert: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = this.loginForm.value;
      this.authService.login(this.loginForm.value).subscribe({
        next: (n : any) => {
          this.isLoading = false;
          sessionStorage.setItem('jwt_tkn', n.token)
          this.router.navigate([''])
        },
        error: (e) => {
          this.isLoading = false;
          this.errorAlert = e.error
        }
       })
    }
  }

}
