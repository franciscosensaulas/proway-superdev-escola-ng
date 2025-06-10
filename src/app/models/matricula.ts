import { Aluno } from "./aluno";

export class Matricula {
    constructor(public aluno: Aluno, public dataMatricula: Date, public id: number) {}
}

export class MatriculaCadastrar{ 
    constructor(public alunoId: number = 0, public cursoId: number = 0){ }
}
