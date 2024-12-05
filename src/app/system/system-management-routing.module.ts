import { Routes } from '@angular/router';

import { AppLayoutComponent } from '../app-layout/app-layout.component';

import { AuthGuardService } from '../core/service/auth-guard.service';

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, //canActivateChild: [AuthGuardService],
    children: [
      {path: 'company',       loadComponent: () => import('./company/company.component').then(mod => mod.CompanyComponent)},
      {path: 'role',          loadComponent: () => import('./role/role.component').then(mod => mod.RoleComponent)},
    ]
  }
];
