import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../utils/interfaces/auth.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDialogModule, NgIf, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  authService = inject(AuthService)
  router = inject(Router)
  loading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true; // show loader
      // Simulate a network request (e.g., calling an API)
      setTimeout(() => {
        // Simulate successful registration after 3 seconds
        const userData = this.registerForm.value;
        console.log('User Registered:', userData);
        this.authService.register(this.registerForm.value).subscribe({
          next: (n : any) => {
            this.loading = false;
            console.log('Registration successful!', this.registerForm.value);
            localStorage.setItem("user", JSON.stringify(n))
            this.router.navigate([''])
          }
        })
        // Handle successful form submission (e.g., navigate to a different page or show a message)
      }, 1000);
    }
  }

}
