import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { HttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/cliente';

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
}
