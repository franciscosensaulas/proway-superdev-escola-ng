import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { CursoCadastro } from '../models/curso-cadastro';
import { CursoEditar } from '../models/curso-editar';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/cursos";
  }

  cadastrar(cursoCadastro: CursoCadastro): Observable<Curso> {
    return this.http.post<Curso>(this.urlApi, cursoCadastro);
  }

  obterTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlApi);
  }

  obterPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.urlApi}/${id}`);
  }

  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  editar(id: number, cursoEditar: CursoEditar): Observable<Curso> {
    return this.http.put<Curso>(`${this.urlApi}/${id}`, cursoEditar);
  }
}
