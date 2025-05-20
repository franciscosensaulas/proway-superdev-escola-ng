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
  dialogVisivelCadastrarEditar: boolean = false;
  dialogTituloCadastrarEditar?: string;
  idAlunoEditar?: number;
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
    this.dataMaxima = new Date(dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDate(), 23, 59, 59)
    debugger
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  private carregarAlunos() {
    this.carregandoAlunos = true;
    // Fazer a requisição para o back-end
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de alunos:" + erro),
      complete: () => this.carregandoAlunos = false
    });
  }

  abrirModalCadastrar() {
    this.dialogTituloCadastrarEditar = "Cadastro de Aluno";
    this.alunoCadastro = new AlunoCadastro();
    this.idAlunoEditar = undefined;
    this.dialogVisivelCadastrarEditar = true;
  }

  abrirModalEditar(aluno: Aluno){
    this.dialogTituloCadastrarEditar = `Editar Aluno - ${aluno.nome.toString()}`;
    this.alunoCadastro = new AlunoCadastro();
    this.alunoCadastro.nome = aluno.nome;
    this.alunoCadastro.sobrenome = aluno.sobrenome;
    this.alunoCadastro.cpf = aluno.cpf;
    this.alunoCadastro.dataNascimento = new Date(aluno.dataNascimento!);
    this.idAlunoEditar = aluno.id;

    this.dialogVisivelCadastrarEditar = true;
  }

  confirm1(event: Event, alunoId: number) {
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
        label: 'Deletar',
        severity: 'danger'
      },
      accept: () => this.apagar(alunoId)
    });
  }

  private apagar(alunoId: number){
    this.alunoService.apagar(alunoId).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o aluno: ${erro}`),
    })
  }

  private apresentarMensagemApagado(){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno removido com sucesso' });
    this.carregarAlunos();
  }

  cadastrar(){
    this.alunoService.cadastrar(this.alunoCadastro).subscribe({
      next: aluno => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o aluno:" + erro),
    })
  }

  private apresentarMensagemCadastrado(){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno cadastrado com sucesso' });
    this.dialogVisivelCadastrarEditar = false
    this.alunoCadastro = new AlunoCadastro();
    this.carregarAlunos();
  }

  salvar(){
    debugger
    if(this.idAlunoEditar === undefined)
      this.cadastrar();
    else
      this.editar();
  }

  private editar(){
    this.alunoService.alterar(this.idAlunoEditar!, this.alunoCadastro).subscribe({
      next: aluno => this.apresentarMensagemEditado(),
      error: erro => console.log("Ocorreu um erro ao editar o aluno:" + erro),
    })
  }

  private apresentarMensagemEditado(){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno alterado com sucesso' });
    this.dialogVisivelCadastrarEditar = false
    this.idAlunoEditar = undefined;
    this.alunoCadastro = new AlunoCadastro();
    this.carregarAlunos();
  }
}
