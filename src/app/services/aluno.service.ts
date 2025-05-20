import { Injectable } from '@angular/core';
import { AlunoCadastro } from '../models/aluno-cadastro';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = "https://public.franciscosensaulas.com/api/v1/escola/alunos";
  }

  cadastrar(alunoCadastro: AlunoCadastro): Observable<any>{
    return this.http.post<any>(this.urlApi, alunoCadastro); // criar
  }

  obterTodos(): Observable<Array<Aluno>>{
    return this.http.get<Array<Aluno>>(this.urlApi); // consultar todos
  }

  apagar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
    // return this.http.delete<any>(this.urlApi + "/" + id);
  }

  alterar(id: number, aluno: AlunoCadastro): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${id}`, aluno);
  }
}


/* HTTP METHODS:
  get => consultar um item em específico ou uma lista de itens
  post => criar um item
  delete => apagar um item específico
  put => alterar um registro

  200 => ok
  201 => created (criado)
  204 => no content => back-end n trouxe nenhum conteúdo, ok a parada
  404 => não encontrado
*/