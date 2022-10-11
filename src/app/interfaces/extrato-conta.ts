import { IConta } from './conta';

export interface IExtratoConta {
  id: string | any;
  data: string | any;
  tipoDeOperacao: string | any;
  valor: string | any;
  observacao: string | any;
  contaBancaria: IConta | any;
}
