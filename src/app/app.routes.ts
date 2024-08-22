import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HouseDetailsComponent } from './pages/house-details/house-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'register',
  },
  {
    path: 'houseDetail/:id',
    component: HouseDetailsComponent,
    title: 'houseDetail',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
