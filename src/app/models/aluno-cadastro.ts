export class AlunoCadastro {
    constructor(
        public nome: string = "", 
        public sobrenome: string = "",
        public dataNascimento?: Date,
        public cpf: string = "",
    ){}
}
