import { Component } from '@angular/core';

@Component({
  selector: 'app-curso-editar',
  imports: [],
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
