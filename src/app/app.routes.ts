import { DashboardComponent } from './pages/dashboard.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Oauth2LoginSuccessComponent } from './login/oauth2-login-success.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ContentComponent } from './pages/content.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'login/:id', component: LoginComponent },
  {path: 'oauth2/:id', component: Oauth2LoginSuccessComponent },
  {path: 'home', component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'content', component: ContentComponent,
        children: [
          {
            path: 'videos',
            component: DashboardComponent
          },
          {
            path: 'playlists',
            component: DashboardComponent
          }
        ]
      }

    ]
  },
  {path: 'system', loadChildren: () => import('src/app/system/system-management-routing.module').then(m => m.routes)},

];
