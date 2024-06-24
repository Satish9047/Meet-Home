import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HouseDetailsComponent } from './pages/house-details/house-details.component';

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
    component: LoginComponent,
    title: 'register',
  },
  {
    path: 'housedetail/:id',
    component: HouseDetailsComponent,
    title: 'housedetail',
  },
];
