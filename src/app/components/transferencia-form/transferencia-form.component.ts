import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ContasService } from 'src/app/services/contas.service';
import { ITransferencia } from '../../interfaces/transferencia';

@Component({
  selector: 'app-transferencia-form',
  templateUrl: './transferencia-form.component.html',
  styleUrls: ['./transferencia-form.component.css'],
})
export class TransferenciaFormComponent implements OnInit {
  loading: boolean = false;
  title: string = 'Transferência';
  isDisabled = true;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contasService: ContasService,
    private modalRef: BsModalRef,
    private toaster: ToastrService
  ) {}

  form = this.formBuilder.group({
    agenciaDestino: ['', [Validators.required]],
    agenciaOrigem: ['', [Validators.required]],
    numeroContaDestino: ['', [Validators.required]],
    numeroContaOrigem: ['', [Validators.required]],
    valor: 0,
  });

  ngOnInit(): void {}

  onSubmitTransferencia() {
    const data: ITransferencia = {
      agenciaDestino: this.form.value.agenciaDestino,
      agenciaOrigem: this.form.value.agenciaOrigem,
      numeroContaDestino: this.form.value.numeroContaDestino,
      numeroContaOrigem: this.form.value.numeroContaOrigem,
      valor: this.form.value.valor,
    };
    if (this.form.valid) {
      this.loading = true;
      this.contasService.TransferenciaConta(data).subscribe(
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
