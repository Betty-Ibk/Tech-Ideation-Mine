import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { AdminMyIdeasComponent } from '../components/admin/admin-my-ideas/admin-my-ideas.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'crises',
        component: ManageCrisesComponent
      },
      {
        path: 'heroes',
        component: ManageHeroesComponent
      },
      {
        path: 'my-ideas',
        component: AdminMyIdeasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}