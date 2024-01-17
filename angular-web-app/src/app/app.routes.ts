import { Routes } from '@angular/router';
import { userGuardGuard } from './user-guard.guard';
export const routes: Routes = [
    {
        path:'home',loadComponent: () => import('./user/pages/user-page/user-page.component').then(m=>m.UserPageComponent) 
    },
    {
        path:'admin-home',canActivate:[userGuardGuard] , loadComponent: () => import('./admin-user/pages/user-page/user-page.component').then(m=>m.AdminUserPageComponent) 
    },
    {
        path:'login',loadComponent: () => import('./login/login.component').then(m=>m.LoginComponent) 
    },
    {
        path:'add-user', loadComponent: () => import('./user/components/add-user/add-user.component').then(m=>m.AddUserComponent)
    },
    {
        path:'edit-user/:id', loadComponent: () => import('./user/components/edit-user/edit-user.component').then(m=>m.EditUserComponent)
    },
    
    {
        path:'add-admin-user', loadComponent: () => import('./admin-user/components/add-user/add-user.component').then(m=>m.AddUserComponent)
    },
    {
        path:'edit-admin-user/:id', loadComponent: () => import('./admin-user/components/edit-user/edit-user.component').then(m=>m.EditUserComponent)
    },
    
    {
        path: '**', redirectTo: 'home'
    },
];