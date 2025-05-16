export class Aluno {
    constructor(
        public nome: string = "", 
        public sobrenome: string = "",
        public dataNascimento?: Date,
        public id?: number,
        public cpf: string = "",
    ){}
}
