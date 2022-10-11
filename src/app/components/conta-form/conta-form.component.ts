import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ContasService } from 'src/app/services/contas.service';
import { ClientesService } from '../../services/clientes.service';
import { ICliente } from '../../interfaces/cliente';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css'],
})
export class ContaFormComponent implements OnInit {
  loading: boolean = false;
  id: number = 0;
  agencia: string = '';
  numero: string = '';
  saldo: number = 0;
  title: string = '';
  cliente: any;
  isDisabled = true;
  clienteList: ICliente[] = [];
  default: string = 'Clientes';
  contas: IConta[] = [];

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contasService: ContasService,
    private clientesService: ClientesService,
    private modalRef: BsModalRef,
    private toaster: ToastrService,
    private router: Router
  ) {}

  form = this.formBuilder.group({
    id: 0,
    agencia: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    saldo: 0,
    ativo: true,
  });

  ngOnInit(): void {
    this.buscarClientes();

    if (this.cliente) {
      this.form.setValue({
        id: this.id,
        agencia: this.agencia,
        cliente: this.cliente.nome,
        numero: this.numero,
        saldo: this.saldo,
        ativo: true,
      });
    }
  }

  buscarClientes() {
    this.clientesService.listarTodosClientes().subscribe((result: any) => {
      console.log(result);
      result.map((res: any) => {
        this.clienteList.push(res);
      });
    });
  }

  buscarClientePorNome() {
    if (this.cliente) {
      this.onSubmit();
    } else {
      this.clientesService
        .buscarClientePorNome(this.form.value.cliente)
        .subscribe((result: any) => {
          this.cliente = result[0];
          this.onSubmit();
        });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.contasService.save(this.form.value, this.cliente).subscribe(
        (result: any) => {
          this.loading = false;
          this.form.reset();

          this.toaster.success('Operação realizada com sucesso!', '', {
            timeOut: 2000,
          });
          this.fecharModal();
        },
        (error) => {
          this.loading = false;
          this.toaster.error('Não foi possível realizar a operação!', '', {
            timeOut: 2000,
          });
        }
      );
    } else {
      this.toaster.error('Não foi possível realizar a operação!', '', {
        timeOut: 2000,
      });
    }
  }

  fecharModal() {
    this.modalRef.hide();
  }
}
