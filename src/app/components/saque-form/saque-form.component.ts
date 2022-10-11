import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ContasService } from 'src/app/services/contas.service';
import { ISaque } from '../../interfaces/saque';

@Component({
  selector: 'app-saque-form',
  templateUrl: './saque-form.component.html',
  styleUrls: ['./saque-form.component.css'],
})
export class SaqueFormComponent implements OnInit {
  loading: boolean = false;
  title: string = 'Saque';
  isDisabled = true;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contasService: ContasService,
    private modalRef: BsModalRef,
    private toaster: ToastrService
  ) {}

  form = this.formBuilder.group({
    agencia: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    valor: 0,
  });

  ngOnInit(): void {}

  onSubmitSaque() {
    const data: ISaque = {
      agencia: this.form.value.agencia,
      numero: this.form.value.numero,
      valor: this.form.value.valor,
    };
    if (this.form.valid) {
      this.loading = true;
      this.contasService.saqueConta(data).subscribe(
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
      this.toaster.warning('Preencha todos os campos!', '', {
        timeOut: 2000,
      });
    }
  }
  fecharModal() {
    this.modalRef.hide();
  }
}
