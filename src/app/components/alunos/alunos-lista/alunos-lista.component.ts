import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DataHoraCustomizadaPipe } from '../../../pipes/data-hora-customizada.pipe';
import { DatePipe } from '@angular/common';
import { FormatarCpfPipe } from '../../../pipes/formatar-cpf.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlunoCadastro } from '../../../models/aluno-cadastro';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-alunos-lista',
  imports: [
    ButtonModule,
    Dialog,
    InputTextModule,
    TableModule,
    DataHoraCustomizadaPipe,
    FormatarCpfPipe,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    InputMaskModule,
    DatePicker,
  ],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css',
  providers: [
    DataHoraCustomizadaPipe,
    DatePipe,
    FormatarCpfPipe,
    MessageService,
    ConfirmationService,
    AlunoService,
  ]
})
export class AlunosListaComponent implements OnInit{
  alunos: Aluno[];
  alunoCadastro: AlunoCadastro; // objeto que será utilizado na dialog(modal) para caadastrar
  visible: boolean = false;
  carregandoAlunos: boolean = false;
  dataMinima: Date;
  dataMaxima: Date;

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private alunoService: AlunoService,
  ) {
    this.alunos = []

    this.alunoCadastro = new AlunoCadastro();

    let dataHoraAgora = new Date(Date.now());

    this.dataMinima = new Date(1900, 0, 1);
    this.dataMaxima = new Date(dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDate())
  }

  ngOnInit(): void {
    this.carregandoAlunos = true;
    // Fazer a requisição para o back-end
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de alunos:" + erro),
      complete: ()  => this.carregandoAlunos = false
    })
  }

  abrirModalCadastrar() {
    this.visible = true;
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
