import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../utils/interfaces/e-commerce.interface';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RatingModule, SkeletonModule, FormsModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  // Injections
  route = inject(ActivatedRoute)
  productService = inject(ProductsService)

  // Variables
  product! : Product;
  addingToCart = false;

  // Statemanagement
  isLoading = false;
  cartAddedProducts: any;
  itemInCart: any;
  totalPrice: any;
  cartItems: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (n : any) => {
        this.isLoading = true;
        this.productService.getAProduct(n.id).subscribe({
          next: (n : any) => {
            this.isLoading = false;
            this.product = n;
            this.product.quantity = 1; // Set default quantity
          },
          error: (e) => {
            this.isLoading = false;
          }
        })
      }
    });
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartAddedProducts = this.cartItems.map((item: Product) => item.id);
    this.calculateTotal();
    
  }

  addToCart(product: Product) {
    this.addingToCart = true;
    
    // Prevent duplicate items
    if (!this.isProductInCart(product)) {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...currentCart, product];
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      this.cartAddedProducts.push(product.id);
    }
  
    // Simulate adding to cart
    setTimeout(() => {
      this.addingToCart = false;
      this.getAllItemsInCart();
    }, 500);
  }
  

  removeFromCart(product: Product) {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = currentCart.filter((item: Product) => item.id !== product.id);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartAddedProducts = this.cartAddedProducts.filter((id : number) => id !== product.id);
    
  }

  getAllItemsInCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.itemInCart = cartItems;
  }

  ItemInCart(product: Product): boolean {
    return this.isProductInCart(product);
  }

  isProductInCart(product: Product): boolean {
    this.assignItem(product);
    return this.cartAddedProducts.includes(product.id) || 
           this.itemInCart.some((item : Product) => item.id === product.id);
  }
  
  assignItem(product: Product) {
    // Check if the product is in cartAddedProducts or itemInCart
    const isInCart = this.itemInCart.some((item: Product) => item.id === product.id);
    
    if (isInCart) {
        // Find the actual product from cart items
        this.product = this.itemInCart.find((item: Product) => item.id === product.id) || product;
    } else {
        this.product = product;
    }
    
    console.log(this.product);
}

 
incrementQuantity(product: Product) {
  const cartItemIndex = this.cartItems.findIndex((item: Product) => item.id === product.id);
  if (cartItemIndex !== -1) {
    this.cartItems[cartItemIndex].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
    this.isProductInCart(product)
  }
}

decrementQuantity(product: Product) {
  const cartItemIndex = this.cartItems.findIndex((item: Product) => item.id === product.id);
  if (cartItemIndex !== -1) {
    if (this.cartItems[cartItemIndex].quantity > 1) {
      this.cartItems[cartItemIndex].quantity--;
    } else {
      // Remove item if quantity becomes 0
      this.cartItems.splice(cartItemIndex, 1);
      this.cartAddedProducts = this.cartAddedProducts.filter((id: number) => id !== product.id);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
    this.isProductInCart(product)
  }
}

calculateTotal() {
  this.totalPrice = this.cartItems.reduce((total: number, item: Product) => 
    total + (item.price * (item.quantity || 1)), 0);
}

}
