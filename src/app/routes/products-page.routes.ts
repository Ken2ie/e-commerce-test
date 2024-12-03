import { Routes } from "@angular/router";
import { HomeProductsPageComponent } from "../pages/home-products-page/home-products-page.component";
import { ProductPageComponent } from "../pages/product-page/product-page.component";
import { CartPageComponent } from "../pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from "../pages/checkout-page/checkout-page.component";

export const routes : Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeProductsPageComponent,
        title: 'Our Shop'
    }, 
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'product-page',
        component: ProductPageComponent
    },
    {
        path: 'checkout',
        component: CheckoutPageComponent
    }
]