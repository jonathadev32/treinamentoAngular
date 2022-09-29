import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { ContasComponent } from './pages/contas/contas.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    canActivateChild: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'clientes',
    canActivateChild: [AuthGuard],
    component: ClientesComponent,
  },
  {
    path: 'contas',
    canActivateChild: [AuthGuard],
    component: ContasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
