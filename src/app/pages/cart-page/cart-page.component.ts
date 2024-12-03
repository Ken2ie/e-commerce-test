import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../utils/interfaces/e-commerce.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
    // Add event listener to observe localStorage changes
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy(): void {
    // Remove event listener when component is destroyed
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  loadCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.totalPrice = 0;
  }

  incrementQuantity(product: Product) {
    const cartItem = this.cartItems.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  decrementQuantity(product: Product) {
    const cartItem = this.cartItems.find(item => item.id === product.id);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.cartItems = this.cartItems.filter(item => item.id !== product.id);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  handleStorageChange(event: StorageEvent) {
    if (event.key === 'cart') {
      this.loadCartItems();
    }
  }
}
