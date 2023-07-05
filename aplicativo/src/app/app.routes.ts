import { Routes } from '@angular/router';
import {NeedLoginGuard} from "./guards/need-login.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [NeedLoginGuard]
  },
  {
    path: '',
    redirectTo: 'lista-passeio',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'user-map/:id',
    loadComponent: () => import('./user-map/user-map.page').then((m) => m.UserMapPage),
    canActivate: [NeedLoginGuard]
  },
  {
    path: 'lista-passeio',
    loadComponent: () => import('./lista-passeio/lista-passeio.page').then((m) => m.ListaPasseioPage),
    canActivate: [NeedLoginGuard]
  },
  {
    path: 'criar-passeio',
    loadComponent: () => import('./criar-passeio/criar-passeio.page').then((m) => m.CriarPasseioPage),
  },
  {
    path: 'manager-passeio/:id',
    loadComponent: () => import('./manager-passeio/manager-passeio.page').then((m) => m.ManagerPasseioPage),
  },
  {
    path: 'admin-empresas',
    loadComponent: () => import('./admin-empresas/admin-empresas.page').then( m => m.AdminEmpresasPage)
  }
];
