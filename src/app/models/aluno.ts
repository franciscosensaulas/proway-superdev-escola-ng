export class Aluno {
    constructor(
        public nome: string = "", 
        public sobrenome: string = "",
        public dataNascimento?: Date,
        public id?: number,
        public cpf: string = "",
    ){}
}

export class AlunoSelect {
    constructor(
        public nomeCompleto: string,
        public id: number,
    ){}
}