import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeObserversService } from '../../services/changeObservers/change-observers.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../utils/interfaces/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../utils/interfaces/e-commerce.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  searckKeyword = "";
  loginMenu = false;

  user : any = localStorage.getItem("user");

  changeObserverService = inject(ChangeObserversService)
  authService = inject(AuthService)
  cartService = inject(CartService)

  itemsInCart : Product[] = [];

  ngOnInit(): void {
    this.getUserData();
    this.getAllCartItems()
  }

  updateObserver(keyword : string){
    this.changeObserverService.updateSearchTerm(keyword);
  }

  userPresent(): boolean {
    return sessionStorage.getItem("jwt_tkn") ? true : false;
  }

  toggleMenuForNotSignedIn(){
    this.loginMenu = !this.loginMenu;
  }

  getUserData(){
    this.authService.getUserData().subscribe({
      next: (n : any) => {
        this.user = n
      }
    })
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
  }

  getAllCartItems(){
    this.cartService.getAllItemsInCart().subscribe({
      next: (n : any) => {
        this.itemsInCart = n
      }
    })
    return this.itemsInCart
  }

}
