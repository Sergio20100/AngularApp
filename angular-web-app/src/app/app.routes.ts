import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'home',loadComponent: () => import('./user/pages/user-page/user-page.component').then(m=>m.UserPageComponent) 
    },
    {
        path: '**', redirectTo: 'home'
    }
];
