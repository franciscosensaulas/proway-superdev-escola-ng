import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Curso } from '../../../models/curso';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cursos-lista',
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent {
  cursos: Array<Curso>;

  constructor(){
    this.cursos = [
      new Curso(1,"Angular","ANG"),
      new Curso(1,"CSS 3","CSS"),
      new Curso(1,"Banco de Dados MYSQL","MSQ"),
    ]
  }
}
