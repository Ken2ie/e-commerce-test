import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../utils/interfaces/e-commerce.interface';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {

  cartItems: Product[] = [];
  totalPrice: number = 0;
  paymentForm: FormGroup;
  paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay'];
  selectedPaymentMethod: string = 'Credit Card';
  _snackBar = inject(MatSnackBar)
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{16}$/),
        Validators.minLength(16),
        Validators.maxLength(16)
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{3,4}$/),
        Validators.minLength(3),
        Validators.maxLength(4)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Process payment
      console.log(this.paymentForm.value);
      this.processPayment();
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  processPayment() {
    localStorage.removeItem('cart')
    this.router.navigate(['/cart'])
    this._snackBar.open("Payment Successful!", "Ok");
  }


  
}
