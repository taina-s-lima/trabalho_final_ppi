import PessoaDB from "../database/pessoadb.js";

export default class PessoaModel {
    #cpf
    #nome
    #telefone
    #email

    constructor(cpf, nome, telefone, email) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    set cpf(novo_cpf) {
        this.#cpf = novo_cpf;
    }

    set nome(novo_nome) {
        this.#nome = novo_nome;
    }

    set telefone(novo_telefone) {
        this.#telefone = novo_telefone;
    }

    set email(novo_email) {
        this.#email = novo_email;
    }

    toJSON() {
        return {
            cpf: this.cpf,
            nome: this.nome,
            telefone: this.telefone,
            email: this.email
        };
    }

    async gravar() {
        const pess = new PessoaDB();
        await pess.gravar(this);
    }

    async atualizar() {
        const pess = new PessoaDB();
        await pess.atualizar(this);
    }

    async excluir() {
        const pess = new PessoaDB();
        await pess.excluir(this.cpf);
    }

    async consultar(termo) {
        const pess = new PessoaDB();
        return await pess.consultar(termo);
    }
}