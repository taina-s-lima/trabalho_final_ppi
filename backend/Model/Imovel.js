import ImovelDB from "../database/imoveldb.js";

export default class ImovelModel {
    #imo_id
    #imo_titulo
    #imo_tipo
    #imo_valor
    #pes_cpf

    constructor(imo_id, imo_titulo, imo_tipo, imo_valor, pes_cpf) {
        this.#imo_id = imo_id;
        this.#imo_titulo = imo_titulo;
        this.#imo_tipo = imo_tipo;
        this.#imo_valor = imo_valor;
        this.#pes_cpf = pes_cpf;
    }

    get imo_id() {
        return this.#imo_id;
    }

    get imo_titulo() {
        return this.#imo_titulo;
    }

    get imo_tipo() {
        return this.#imo_tipo;
    }

    get imo_valor() {
        return this.#imo_valor;
    }

    get pes_cpf() {
        return this.#pes_cpf;
    }

    set imo_id(novo_imo_id) {
        this.#imo_id = novo_imo_id;
    }

    set imo_titulo(novo_imo_titulo) {
        this.#imo_titulo = novo_imo_titulo;
    }

    set imo_tipo(novo_imo_tipo) {
        this.#imo_tipo = novo_imo_tipo;
    }

    set imo_valor(novo_imo_valor) {
        this.#imo_valor = novo_imo_valor;
    }

    toJSON() {
        return {
            imo_id: this.imo_id,
            imo_titulo: this.imo_titulo,
            imo_tipo: this.imo_tipo,
            imo_valor: this.imo_valor,
            pes_cpf: this.pes_cpf
        };
    }

    async gravar() {
        const imo = new ImovelDB();
        await imo.gravar(this);
    }

    async atualizar() {
        const imo = new ImovelDB();
        await imo.atualizar(this);
    }

    async excluir() {
        const imo = new ImovelDB();
        await imo.excluir(this.imo_id);
    }

    async consultar(termo) {
        const imo = new ImovelDB();
        return await imo.consultar(termo);
    }
}