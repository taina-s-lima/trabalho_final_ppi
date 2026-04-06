import Imovel from "../Model/Imovel.js";
import conexao from "./conexao.js";

export default class Imoveldb {

    async gravar(imovel){
        if(imovel instanceof Imovel){
            const sql = "INSERT INTO imovel (imo_id, imo_titulo, imo_tipo, imo_valor, pes_cpf) VALUES (?, ?, ?, ?, ?)";
            const parametros = [
                imovel.id,
                imovel.titulo,
                imovel.tipo,
                imovel.valor,
                imovel.proprietarioCpf
            ];
            const conn = await conexao();   
            const resultado = await conn.execute(sql, parametros);
            imovel.id = resultado[0].insertId;
            conn.release();
        }
    }

    async atualizar(imovel){
        if(imovel instanceof Imovel){
            const sql = "UPDATE imovel SET imo_titulo = ?, imo_tipo = ?, imo_valor = ?, pes_cpf = ? WHERE imo_id = ?";
            const parametros = [
                imovel.titulo,
                imovel.tipo,
                imovel.valor,
                imovel.proprietarioCpf,
                imovel.id
            ];
            const conn = await conexao();   
            const resultado = await conn.execute(sql, parametros);
            imovel.id = resultado[0].insertId;
            conn.release();
        }
    }

    async atualizar(imovel){
        if(imovel instanceof Imovel){
            const sql = "UPDATE imovel SET imo_titulo = ?, imo_tipo = ?, imo_valor = ?, pes_cpf = ? WHERE imo_id = ?";
            const parametros = [
                imovel.titulo,
                imovel.tipo,
                imovel.valor,
                imovel.proprietarioCpf,
                imovel.id
            ];
            const conn = await conexao();   
            const resultado = await conn.execute(sql, parametros);
            imovel.id = resultado[0].insertId;
            conn.release();
        }
    }

    async excluir(id){
        if(id){
            const sql = "DELETE FROM imovel WHERE imo_id = ?";
            const parametros = [id];
            const conn = await conexao();
            await conn.execute(sql, parametros);
            conn.release();
        }
    }

    async consultar(termo){
        let sql = '';
        let parametros = [];

        sql = "SELECT * FROM imovel WHERE imo_titulo LIKE ?";
        parametros = [`%${termo}%`];

        const conn = await conexao();
        const resultado = await conn.query(sql, parametros);
        conn.release();

        let ListaImovel = [];

        for(const resultados of resultado[0]){
            const imovel = new Imovel(
                resultados.imo_id,
                resultados.imo_titulo,
                resultados.imo_tipo,
                resultados.imo_valor,
                resultados.pes_cpf
            );

            ListaImovel.push(imovel);
        }

        return ListaImovel;

    }
}