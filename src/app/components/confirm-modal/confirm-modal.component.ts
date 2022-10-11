import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  id: number = 0;
  loading: boolean = false;
  clientes: ICliente[] = [];

  constructor(
    private modalRef: BsModalRef,
    private clientesService: ClientesService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarTodosClientes();
  }

  deletarCliente(id: number) {
      this.loading = true;
    this.clientesService.deletarCliente(id).subscribe(
      (clientes: ICliente) => {
        this.loading = false;
        this.fecharModal();
        this.buscarTodosClientes();
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  buscarTodosClientes() {
    this.loading = true;
    this.clientesService
      .listarTodosClientes()
      .subscribe((clientes: ICliente[]) => {
        this.loading = false;
        this.clientes = clientes;
      });
  }

  fecharModal() {
    this.modalRef.hide();
  }
}
