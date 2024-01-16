import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path:'home',loadComponent: () => import('./user/pages/user-page/user-page.component').then(m=>m.UserPageComponent) 
    },
    {
        path:'add-user', loadComponent: () => import('./user/components/add-user/add-user.component').then(m=>m.AddUserComponent)
    },
    {
        path:'edit-user/:id', loadComponent: () => import('./user/components/edit-user/edit-user.component').then(m=>m.EditUserComponent)
    },
    {
        path: '**', redirectTo: 'home'
    },
];