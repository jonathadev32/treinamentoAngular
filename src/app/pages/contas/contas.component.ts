import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from '../../services/contas.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClienteFormComponent } from 'src/app/components/cliente-form/cliente-form.component';
import { ContaFormComponent } from 'src/app/components/conta-form/conta-form.component';
import { ICliente } from '../../interfaces/cliente';
import { tiposMetodos } from '../../enums/tipos-metodos.enum';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],
})
export class ContasComponent implements OnInit {
  contas: IConta[] = [];
  loading: Boolean = false;
  tiposMetodos = tiposMetodos;

  constructor(
    private contasService: ContasService,
    private bsModalService: BsModalService,
    private modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
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
}
