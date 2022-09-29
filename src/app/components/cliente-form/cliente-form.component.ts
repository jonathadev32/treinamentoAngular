import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  loading: boolean = false;
  success: boolean = false;
  error: boolean = false;
  id: number = 0;
  nome: string = '';
  cpf: string = '';
  email: string = '';
  observacoes: string = '';
  title: string = '';

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private clientesService: ClientesService,
    private modalRef: BsModalRef
  ) {}

  form = this.formBuilder.group({
    id: 0,
    nome: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required]],
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
