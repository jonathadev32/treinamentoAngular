import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ContasService } from 'src/app/services/contas.service';
import { IExtratoConta } from '../../interfaces/extrato-conta';
import { faSearch, faPrint, faFile } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css'],
})
export class ExtratoComponent implements OnInit {
  p: number = 1;
  loading: boolean = false;
  title: string = 'Extrato Bancário';
  isDisabled = true;
  extratos: any[] = [];
  faSearch = faSearch;
  faPrint = faPrint;
  faFile = faFile;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contasService: ContasService,
    private toaster: ToastrService
  ) {}

  form = this.formBuilder.group({
    agencia: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    dataInicio: ['', [Validators.required]],
    dataFim: ['', [Validators.required]],
  });
  ngOnInit(): void {}

  onSubmitExtrato() {
    let newDate: moment.Moment = moment.utc(this.form.value.dataInicio).local();
    this.form.value.dataInicio = newDate.format('DD-MM-YYYY');
    let newDate2: moment.Moment = moment.utc(this.form.value.dataFim).local();
    this.form.value.dataFim = newDate2.format('DD-MM-YYYY');

    // No SubmintExtrato ele vai pegar os valores do formulario e adicionar a variavel data e passar no metodo ExtratoConta do service que vai mandar para
    // o Backend.
    const data: IExtrato = {
      agencia: this.form.value.agencia,
      numero: this.form.value.numero,
      dataInicio: this.form.value.dataInicio,
      dataFim: this.form.value.dataFim,
    };
    if (this.form.valid) {
      this.loading = true;
      this.contasService.ExtratoConta(data).subscribe(
        (result: IExtratoConta) => {
          this.loading = false;

          this.toaster.success('Operação feita com sucesso!', '', {
            timeOut: 2000,
          });

          // Faz o push no extratos da lista
          this.extratos.push(result);
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
}
