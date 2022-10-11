import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  loading: boolean = false;
  id: number = 0;
  nome: string = '';
  cpf: string = '';
  email: string = '';
  observacoes: string = '';
  title: string = '';

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private clientesService: ClientesService,
    private modalRef: BsModalRef,
    private toaster: ToastrService,
    private router: Router
  ) {}

  form = this.formBuilder.group({
    id: 0,
    nome: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    observacoes: [''],
    ativo: true,
  });

  ngOnInit(): void {
    this.form.setValue({
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      observacoes: this.observacoes,
      ativo: true,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.clientesService.save(this.form.value).subscribe(
        (result: any) => {
          this.loading = false;

          this.form.reset();
          this.fecharModal();
          this.toaster.success('Operação realizada com sucesso!', '', {
            timeOut: 2000,
          });
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
