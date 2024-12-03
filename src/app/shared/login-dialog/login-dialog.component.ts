import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatDialogModule, NgIf, CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  loginForm: FormGroup;

  // Injections

  authService = inject(AuthService)
  router = inject(Router)

  // Statemanagement

  isLoading = false;

  errorAlert = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }



  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
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

  onCancel() {
    this.dialogRef.close(null); // Close without action
  }
}
