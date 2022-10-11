import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from '../../services/contas.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContaFormComponent } from 'src/app/components/conta-form/conta-form.component';
import { ICliente } from '../../interfaces/cliente';
import { tiposMetodos } from '../../enums/tipos-metodos.enum';
import { IDeposito } from '../../interfaces/deposito';
import { DepositoFormComponent } from '../../components/deposito-form/deposito-form.component';
import { SaqueFormComponent } from 'src/app/components/saque-form/saque-form.component';
import { TransferenciaFormComponent } from 'src/app/components/transferencia-form/transferencia-form.component';
import { ClientesService } from '../../services/clientes.service';
import { ExtratoComponent } from '../extrato/extrato.component';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],
})
export class ContasComponent implements OnInit, OnChanges {
  p: number = 1;
  deposito: IDeposito[] = [];
  contas: IConta[] = [];
  loading: Boolean = false;
  tiposMetodos = tiposMetodos;

  constructor(
    private contasService: ContasService,
    private clienteService: ClientesService,
    private bsModalService: BsModalService,
    private modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.buscarTodasContas();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buscarTodasContas();
  }

  buscarTodasContas() {
    this.loading = true;
    this.contasService.listarTodasContas().subscribe((contas: IConta[]) => {
      this.loading = false;
      this.contas = contas;
    });
  }

  deletarConta(id: number) {
    this.loading = true;
    this.contasService.deletarConta(id).subscribe(
      (contas: IConta) => {
        this.loading = false;
        this.buscarTodasContas();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  openModalComponent(
    tipo: string,
    id?: number,
    agencia?: string,
    cliente?: ICliente,
    numero?: string,
    saldo?: number,
    nome?: string
  ) {
    const initalStateEditar = {
      id,
      agencia,
      cliente,
      numero,
      saldo,
      nome,
      title: tipo,
    };

    const initalStateCadastrar = {
      title: tipo,
    };
    if (tipo === tiposMetodos.CADASTRAR_CONTA) {
      this.modalRef = this.bsModalService.show(ContaFormComponent, {
        initialState: initalStateCadastrar,
        class: 'my-modal',
      });
    } else {
      this.modalRef = this.bsModalService.show(ContaFormComponent, {
        initialState: initalStateEditar,
        class: 'my-modal',
      });
    }
  }

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
