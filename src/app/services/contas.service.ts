import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/cliente';
import { IDeposito } from '../interfaces/deposito';
import { ISaque } from '../interfaces/saque';
import { ITransferencia } from '../interfaces/transferencia';
import { IExtrato } from '../interfaces/extrato';
import { IExtratoConta } from '../interfaces/extrato-conta';

@Injectable({
  providedIn: 'root',
})
export class ContasService {
  endpoint = 'contas/';
  api = environment.api;

  constructor(private http: HttpClient) {}

  listarTodasContas() {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}`);
  }

  deletarConta(id: number) {
    return this.http.delete<IConta>(`${this.api}/${this.endpoint}${id}`);
  }

  save(data: any, cliente: ICliente) {
    if (data.id) {
      return this.atualizarConta(data, cliente);
    }

    return this.criarConta(data, cliente);
  }

  criarConta(data: any, cliente: ICliente) {
    const parseData = {
      agencia: data.agencia,
      cliente: {
        ativo: true,
        cpf: cliente.cpfMascarado,
        email: cliente.email,
        id: cliente.id,
        nome: cliente.nome,
        observacoes: cliente.observacoes,
      },
      numero: data.numero,
      saldo: data.saldo,
    };
    return this.http.post<IConta>(`${this.api}/${this.endpoint}`, parseData);
  }

  atualizarConta(data: any, cliente: ICliente) {
    const parseData = {
      agencia: data.agencia,
      cliente: {
        ativo: true,
        cpf: cliente.cpf,
        email: cliente.email,
        id: cliente.id,
        nome: cliente.nome,
        observacoes: cliente.observacoes,
      },
      id: data.id,
      numero: data.numero,
      saldo: data.saldo,
    };
    return this.http.put<IConta>(
      `${this.api}/${this.endpoint}${data.id}`,
      parseData
    );
  }

  depositarNaConta(data: IDeposito) {
    const parseData = {
      agencia: data.agencia,
      numeroConta: data.numero,
      valor: data.valor,
    };
    return this.http.put<IDeposito>(
      `${this.api}/${this.endpoint}deposito`,
      parseData
    );
  }

  saqueConta(data: ISaque) {
    const parseData = {
      agencia: data.agencia,
      numeroConta: data.numero,
      valor: data.valor,
    };
    return this.http.put<ISaque>(
      `${this.api}/${this.endpoint}sacar`,
      parseData
    );
  }

  TransferenciaConta(data: ITransferencia) {
    const parseData = {
      agenciaDestino: data.agenciaDestino,
      agenciaOrigem: data.agenciaOrigem,
      numeroContaDestino: data.numeroContaDestino,
      numeroContaOrigem: data.numeroContaOrigem,
      valor: data.valor,
    };
    return this.http.put<IDeposito>(
      `${this.api}/${this.endpoint}transferencia`,
      parseData
    );
  }
  ExtratoConta(data: IExtrato) {
    return this.http.get<IExtratoConta>(
      `${this.api}/extratos/ExtratoBancario/${data.numero}/${data.agencia}/${data.dataInicio}/${data.dataFim}`
    );
  }
}
