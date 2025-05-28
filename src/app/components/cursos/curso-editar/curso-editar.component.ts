import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CursoEditar } from '../../../models/curso-editar';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-curso-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
  curso: CursoEditar;

  constructor(
    private cursoSerivce: CursoService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.curso = new CursoEditar();
  }

  cadastrar() {
    this.cursoSerivce.cadastrar(this.curso).subscribe({
      next: aluno => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o aluno:" + erro),
    })
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Curso alterado com sucesso' });
    this.router.navigate(["/cursos"]);
  }
}
