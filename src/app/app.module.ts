import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ContasComponent } from './pages/contas/contas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClientesService } from './services/clientes.service';
import { ContaFormComponent } from './components/conta-form/conta-form.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { DepositoFormComponent } from './components/deposito-form/deposito-form.component';
import { SaqueFormComponent } from './components/saque-form/saque-form.component';
import { TransferenciaFormComponent } from './components/transferencia-form/transferencia-form.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    ContasComponent,
    ClienteFormComponent,
    ContaFormComponent,
    LoginComponent,
    OperacoesComponent,
    DepositoFormComponent,
    SaqueFormComponent,
    TransferenciaFormComponent,
    SideBarComponent,
    ExtratoComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(environment.toastConfig),
    NgxPaginationModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    

  ],
  providers: [ClientesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
