import Pessoa from "../Model/Pessoa.js";
import conexao from "./conexao.js";

export default class Pessoadb {

    async gravar(pessoa) {
        if (pessoa instanceof Pessoa) {
            const sql = "INSERT INTO pessoa (pes_cpf, pes_nome, pes_telefone, pes_email) VALUES (?, ?, ?, ?)";
            const parametros = [
                pessoa.cpf,
                pessoa.nome,
                pessoa.telefone,
                pessoa.email
            ];
            const conn = await conexao();
            const resultado = await conn.execute(sql, parametros);
            pessoa.cpf = resultado[0].insertId;
            conn.release();
        }
    }

    async atualizar(pessoa) {
        if (pessoa instanceof Pessoa) {
            const sql = "UPDATE pessoa SET pes_nome = ?, pes_telefone = ?, pes_email = ? WHERE pes_cpf = ?";
            const parametros = [
                pessoa.nome,
                pessoa.telefone,
                pessoa.email,
                pessoa.cpf
            ];
            const conn = await conexao();
            const resultado = await conn.execute(sql, parametros);
            console.log(resultado);
            conn.release();
            return resultado[0].affectedRows;

        }
    }

    async excluir(cpf) {
        if (cpf) {
            const sql = "DELETE FROM pessoa WHERE pes_cpf = ?";
            const parametros = [cpf];
            const conn = await conexao();
            await conn.execute(sql, parametros);
            conn.release();
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];

        if (termo) {
            sql = `
            SELECT * 
            FROM pessoa 
            WHERE pes_nome LIKE ? 
               OR pes_cpf = ?
        `;
            parametros = [`%${termo}%`, termo];
        } else {
            sql = "SELECT * FROM pessoa";
        }

        const conn = await conexao();
        const [resultado] = await conn.query(sql, parametros);
        conn.release();

        const ListaPessoa = resultado.map(resultados =>
            new Pessoa(
                resultados.pes_cpf,
                resultados.pes_nome,
                resultados.pes_telefone,
                resultados.pes_email
            )
        );

        return ListaPessoa;
    }
}