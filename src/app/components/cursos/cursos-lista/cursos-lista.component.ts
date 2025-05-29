import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Curso } from '../../../models/curso';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-cursos-lista',
  imports: [TableModule, CommonModule, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css',
  providers: [MessageService, ConfirmationService]
})
export class CursosListaComponent implements OnInit {
  cursos: Array<Curso>;
  carregandoCursos?: boolean;

  constructor(
    private router: Router, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private cursoService: CursoService,
  ) {
    this.cursos = []
  }
  ngOnInit(): void {
    this.carregarCursos();
  }

  private carregarCursos() {
    this.carregandoCursos = true;
    this.cursoService.obterTodos().subscribe({
      next: cursos => this.cursos = cursos,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de cursos:" + erro),
      complete: () => this.carregandoCursos = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/cursos/cadastro"])
  }

  redirecionarEditar(idCurso: number) {
    this.router.navigate(["/cursos/editar/" + idCurso])
  }

  confirmarParaApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'danger'
      },
      accept: () => this.apagar(id)
    });
  }

  private apagar(id: number){
    this.cursoService.apagar(id).subscribe({ 
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o curso: ${erro}`),
    })
  }

  private apresentarMensagemApagado(){
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Sucesso', 
      detail: 'Curso removido com sucesso',
     });
    this.carregarCursos();
  }

}
