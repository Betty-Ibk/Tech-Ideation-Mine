import { Routes } from '@angular/router';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { PopularIdeasComponent } from './components/popular-ideas/popular-ideas.component';
import { MyIdeasComponent } from './components/my-ideas/my-ideas.component';
import { AccountComponent } from './components/account/account.component';
import { NewIdeaComponent } from './components/new-idea/new-idea.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminMyIdeasComponent } from './components/admin/admin-my-ideas/admin-my-ideas.component';
import { authGuard, adminGuard } from './guards/auth.guard';
import { IdeaFeedComponent } from './components/idea-feed/idea-feed.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: IdeaListComponent, canActivate: [authGuard] },
  { path: 'popular', component: PopularIdeasComponent, canActivate: [authGuard] },
  { 
    path: 'my-ideas', 
    canActivate: [authGuard],
    component: MyIdeasComponent,
    data: { roles: ['user'] }
  },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'new-idea', component: NewIdeaComponent, canActivate: [authGuard] },
  { 
    path: 'admin', 
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminDashboardComponent },
      { path: 'ideas', component: AdminDashboardComponent },
      { path: 'settings', component: AdminDashboardComponent },
      { path: 'my-ideas', component: AdminMyIdeasComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'idea-feed', component: IdeaFeedComponent, canActivate: [authGuard] },
];
