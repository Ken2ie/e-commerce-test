import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../utils/interfaces/e-commerce.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, finalize, forkJoin } from 'rxjs';
import { ChangeObserversService } from '../../services/changeObservers/change-observers.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-home-products-page',
  standalone: true,
  imports: [RatingModule, FormsModule, RouterLink, CommonModule, SkeletonModule],
  templateUrl: './home-products-page.component.html',
  styleUrl: './home-products-page.component.css'
})
export class HomeProductsPageComponent implements OnInit{


  value= 2;

  // Injections
  productsService = inject(ProductsService)
  changeObserverService = inject(ChangeObserversService)
  cartService = inject(CartService)
  
  // Variables
  allProducts! : Product[];
  categories! : string[];
  addingToCart = false;
  itemInCart : Product[] = [];

  // Statemanagement

  errorOccured = false;
  isLoading = false;
  filteredProducts!: Product[];
  selectedCategory: string = "All";
  


  ngOnInit(): void {
    this.loadProductData();

    
    this.changeObserverService.searchTerm$
    .pipe(
      debounceTime(300),  // Wait for user to stop typing
      distinctUntilChanged(),  // Only emit when search term changes
      filter(term => term.length > 0)  // Minimum search length
    )
    .subscribe({
      next: (n) => {
        this.onSearchInput(n)
      }
    });
    
    this.getAllItemsInCart();
  }

  loadProductData() {
    this.isLoading = true;
    this.selectedCategory = "All"
    
    forkJoin({
      products: this.productsService.getAllProducts(),
      categories: this.productsService.getProductCategory()
    }).pipe(
      finalize(() => this.isLoading = false),
      catchError(error => {

        return EMPTY;
      })
    ).subscribe({
      next: (result) => {
        this.allProducts = result.products;
        this.categories = result.categories;
        this.filteredProducts = this.allProducts
      }
    });
  }

  // Search function

  onSearchInput(searchTerm: string) {
    if (searchTerm == "") {
      this.filteredProducts = this.allProducts;
      return;
    }
  
    const lowercaseTerm = searchTerm.toLowerCase().trim();
  
    this.filteredProducts = this.allProducts.filter(product => 
      // Explicitly check specific fields
      product.title.toLowerCase().includes(lowercaseTerm) ||
      product.category.toLowerCase().includes(lowercaseTerm) ||
      (product.description && product.description.toLowerCase().includes(lowercaseTerm)) ||
      product.id.toString().includes(lowercaseTerm)
    );
  }


  getAllProductsInACategory(category : string){
    this.selectedCategory = category;
    this.isLoading = true;
    this.productsService.getAllProductsInCategory(category).subscribe({
      next: (n) => {
        this.isLoading = false;
        this.filteredProducts = n;
      },
      error: (e) => {
        this.isLoading = false;
      }
    })
  }


  getAllItemsInCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.itemInCart = cartItems;
  }

  // ItemInCart(product: Product): boolean {
  //   return this.isProductInCart(product);
  // }

  // Add method to add a single product to cart
 // In component
cartAddedProducts: number[] = [];

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

isProductInCart(product: Product): boolean {
  return this.cartAddedProducts.includes(product.id) || 
         this.itemInCart.some(item => item.id === product.id);
}

ItemInCart(product: Product): boolean {
  return this.isProductInCart(product);
}

removeFromCart(product: Product) {
  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = currentCart.filter((item: Product) => item.id !== product.id);
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  this.cartAddedProducts = this.cartAddedProducts.filter(id => id !== product.id);
  
  this.getAllItemsInCart();
}

onCategoryKeydown(event: KeyboardEvent, category: string) {
  if (event.key === 'Enter' || event.key === ' ') {
    category === 'All' ? this.loadProductData() : this.getAllProductsInACategory(category);
  }
}

// Keyboard navigation for cart actions
onCartActionKeydown(event: KeyboardEvent, product: Product, action: 'add' | 'remove') {
  if (event.key === 'Enter' || event.key === ' ') {
    action === 'add' ? this.addToCart(product) : this.removeFromCart(product);
  }
}
}
