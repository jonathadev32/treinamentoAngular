import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ContasComponent } from './pages/contas/contas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClientesService } from './services/clientes.service';
import { ContaFormComponent } from './components/conta-form/conta-form.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    HeaderComponent,
    ContasComponent,
    ClienteFormComponent,
    ContaFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(environment.toastConfig),
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
