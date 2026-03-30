import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { HomeUserComponent } from './features/home-user/home-user.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, title: 'Celed Prime | Home'
    },
    {
        path: 'login', component: LoginComponent, title: 'Celed Prime | Login'
    },
    {
        path: 'home', component: HomeUserComponent, title: 'Celed Prime | Home User'
    }
];
