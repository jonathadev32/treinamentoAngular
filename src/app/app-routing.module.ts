import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { ContasComponent } from './pages/contas/contas.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    component: ClientesComponent,
  },
  {
    path: 'contas',
    canActivate: [AuthGuard],
    component: ContasComponent,
  },
  {
    path: 'operacoes',
    canActivate: [AuthGuard],
    component: OperacoesComponent,
  },
  {
    path: 'extrato',
    canActivate: [AuthGuard],
    component: ExtratoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
