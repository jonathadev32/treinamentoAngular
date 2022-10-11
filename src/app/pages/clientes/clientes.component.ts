import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';
import { tiposMetodos } from '../../enums/tipos-metodos.enum';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  p: number = 1;
  clientes: ICliente[] = [];
  loading: boolean = false;
  tiposMetodos = tiposMetodos;

  constructor(
    private clienteService: ClientesService,
    private bsModalService: BsModalService,
    private modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.buscarTodosClientes();
  }

  buscarTodosClientes() {
    this.loading = true;
    this.clienteService
      .listarTodosClientes()
      .subscribe((clientes: ICliente[]) => {
        this.loading = false;
        this.clientes = clientes;
      });
  }

  openModalComponent(
    tipo: string,
    id?: number,
    nome?: string,
    cpf?: string,
    email?: string,
    observacoes?: string
  ) {
    const initalStateEditar = {
      id,
      nome,
      cpf,
      email,
      observacoes,
      title: tipo,
    };

    const initalStateCadastrar = {
      title: tipo,
    };
    const initialStateDeletar = {
      id
    };


    if (tipo === tiposMetodos.CADASTRAR) {
      this.modalRef = this.bsModalService.show(ClienteFormComponent, {
        initialState: initalStateCadastrar,
        class: 'my-modal',
      });
    }
    if (tipo === tiposMetodos.DELETAR) {
      this.modalRef = this.bsModalService.show(ConfirmModalComponent, {
        initialState: initialStateDeletar,
        class: 'my-modal',
      });
    }

    else {
      this.modalRef = this.bsModalService.show(ClienteFormComponent, {
        initialState: initalStateEditar,
        class: 'my-modal',
      });
    }
  }



}
