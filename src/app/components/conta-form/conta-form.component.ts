import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ContasService } from 'src/app/services/contas.service';
import { ClientesService } from '../../services/clientes.service';
import { ICliente } from '../../interfaces/cliente';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css'],
})
export class ContaFormComponent implements OnInit {
  loading: boolean = false;
  success: boolean = false;
  error: boolean = false;
  id: number = 0;
  agencia: string = '';
  numero: string = '';
  saldo: number = 0;
  title: string = '';
  cliente: any;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contasService: ContasService,
    private clientesService: ClientesService,
    private modalRef: BsModalRef
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

          this.success = true;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.error = true;

          setTimeout(() => {
            this.error = false;
            this.form.reset();
          }, 3000);
        }
      );
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
        this.form.reset();
      }, 3000);
    }
  }

  fecharModal() {
    this.modalRef.hide();
  }
}
