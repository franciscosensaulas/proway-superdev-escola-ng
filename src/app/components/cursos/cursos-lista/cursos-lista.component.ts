import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Curso } from '../../../models/curso';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cursos-lista',
  imports: [TableModule, CommonModule, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css',
  providers: [MessageService, ConfirmationService]
})
export class CursosListaComponent {
  cursos: Array<Curso>;

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.cursos = [
      new Curso(1, "Angular", "ANG"),
      new Curso(1, "CSS 3", "CSS"),
      new Curso(1, "Banco de Dados MYSQL", "MSQ"),
    ]
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/cursos/cadastro"])
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }


}
