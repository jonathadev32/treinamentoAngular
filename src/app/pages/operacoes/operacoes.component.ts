import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContaFormComponent } from 'src/app/components/conta-form/conta-form.component';
import { DepositoFormComponent } from 'src/app/components/deposito-form/deposito-form.component';
import { SaqueFormComponent } from 'src/app/components/saque-form/saque-form.component';
import { TransferenciaFormComponent } from 'src/app/components/transferencia-form/transferencia-form.component';
import { tiposMetodos } from 'src/app/enums/tipos-metodos.enum';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.css'],
})
export class OperacoesComponent implements OnInit {
  contas: IConta[] = [];
  loading: Boolean = false;
  tiposMetodos = tiposMetodos;

  constructor(
    private contasService: ContasService,
    private bsModalService: BsModalService,
    private modalRef: BsModalRef
  ) {}

  ngOnInit(): void {}



  openModalComponentDeposito() {
    this.modalRef = this.bsModalService.show(DepositoFormComponent, {
      class: 'my-modal',
    });
  }
  openModalComponentSaque() {
    this.modalRef = this.bsModalService.show(SaqueFormComponent, {
      class: 'my-modal',
    });
  }
  openModalComponentTransferencia() {
    this.modalRef = this.bsModalService.show(TransferenciaFormComponent, {
      class: 'my-modal',
    });
  }
}
