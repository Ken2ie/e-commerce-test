import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        component: NavbarComponent,
        loadChildren: () => import('./routes/products-page.routes').then(m=> m.routes)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
