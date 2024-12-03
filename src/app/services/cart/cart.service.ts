import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.bast';
import { Product } from '../../utils/interfaces/e-commerce.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  httpClient = inject(HttpClient);

  addToCart(cart : object){
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getAllItemsInCart(): Observable<Product[]> {
    return new Observable(observer => {
      // Initial cart load
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      observer.next(cartItems);
  
      // Listen for storage changes
      const storageListener = (event: StorageEvent) => {
        if (event.key === 'cart') {
          const updatedCart = JSON.parse(event.newValue || '[]');
          observer.next(updatedCart);
        }
      };
  
      window.addEventListener('storage', storageListener);
  
      // Cleanup listener when Observable is unsubscribed
      return () => {
        window.removeEventListener('storage', storageListener);
      };
    });
  }
}
