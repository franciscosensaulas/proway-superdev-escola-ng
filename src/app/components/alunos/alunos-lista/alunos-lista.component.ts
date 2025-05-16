import { Component } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DataHoraCustomizadaPipe } from '../../../pipes/data-hora-customizada.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alunos-lista',
  imports: [ButtonModule, Dialog, InputTextModule, TableModule, DataHoraCustomizadaPipe],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css',
  providers: [DataHoraCustomizadaPipe]
})
export class AlunosListaComponent {
  alunos: Aluno[];

  visible: boolean = false;

  constructor(){
    this.alunos = [
      new Aluno("Matheus", "da Silva", new Date(2000, 4, 5), 1, "123.456.789-10")
    ]
  }
  
  abrirModalCadastrar(){
    this.visible = true;
  }
}
