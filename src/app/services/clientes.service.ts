import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  endpoint = 'clientes/';
  api = environment.api;

  constructor(private http: HttpClient) {}

  listarTodosClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  buscarClientePorNome(nome: any) {
    return this.http.get<ICliente[]>(
      `${this.api}/${this.endpoint}/buscarPorNome/${nome}`
    );
  }

  deletarCliente(id: number) {
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}${id}`);
  }

  save(data: Partial<ICliente>) {
    if (data.id) {
      return this.atualizarCliente(data);
    }

    return this.criarCliente(data);
  }

  criarCliente(data: any) {
    const parseData = {
      ativo: data.ativo,
      cpf: data.cpf,
      email: data.email,
      nome: data.nome,
      observacoes: data.observacoes,
    };
    return this.http.post<ICliente>(`${this.api}/${this.endpoint}`, parseData);
  }

  atualizarCliente(data: any) {
    return this.http.put<ICliente>(
      `${this.api}/${this.endpoint}${data.id}`,
      data
    );
  }
}
