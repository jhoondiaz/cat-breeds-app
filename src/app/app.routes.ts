import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'user/profile',
    loadComponent: () => import('./features/user-profile/user-profile.component').then(c => c.UserProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cat-breeds',
    loadComponent: () => import('./features/cat-breeds/cat-breeds.component').then(c => c.CatBreedsComponent),
    canActivate: [AuthGuard]
  }
];
