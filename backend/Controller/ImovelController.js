import Imovel from '../Model/Imovel.js';
import Pessoa from '../Model/Pessoa.js';

export default class ImovelController {

    gravar(req, res) {
        if (req.method === 'POST' && req.is('application/json')) {

            const imo_titulo = req.body.imo_titulo;
            const imo_tipo = req.body.imo_tipo;
            const imo_valor = req.body.imo_valor;

            if (imo_titulo && imo_tipo && imo_valor) {

                const imovelModel = new Imovel(0, imo_titulo, imo_tipo, imo_valor, '');
                imovelModel.gravar(imovelModel).then((result) => {

                    res.status(201).json({
                        "status": true,
                        "message": "Imovel cadastrado com sucesso",
                        "id": imovelModel.id
                    })

                }).catch((error) => {
                    res.status(500).json({ error: 'Erro ao cadastrar imovel', details: error.message });
                });
            } else {
                res.status(400).json({ error: 'Dados incompletos' });
            }

        } else {
            res.status(400).json({ error: 'Método não permitido' });
        }
    }

    editar(req, res) {
        if ((req.method === 'PUT' || req.method === 'PATCH') && req.is('application/json')) {
            const imo_id = req.body.imo_id;
            const imo_titulo = req.body.imo_titulo;
            const imo_tipo = req.body.imo_tipo;
            const imo_valor = req.body.imo_valor;
            const pes_cpf = req.body.pes_cpf;

            if (imo_id && imo_titulo && imo_tipo && imo_valor && pes_cpf) {
                const imovelModel = new Imovel(imo_id, imo_titulo, imo_tipo, imo_valor, pes_cpf);
                imovelModel.atualizar().then((result) => {
                    res.status(200).json({
                        "status": true,
                        "message": "Imovel atualizado com sucesso"
                    });
                }).catch((error) => {
                    res.status(500).json({
                        error: 'Erro ao atualizar imovel',
                        details: error.message
                    });
                });
            } else {
                res.status(400).json({ error: 'Dados incompletos' });
            }
        } else {
            res.status(400).json({ error: 'Método não permitido' });
        }
    }

    excluir(req, res) {
        if (req.method === 'DELETE') {
            const imo_id = req.params.imo_id;
            console.log(imo_id);
            if (imo_id > 0) {
                const imovelModel = new Imovel(imo_id);
                imovelModel.excluir().then((result) => {
                    res.status(200).json({
                        "status": true,
                        "message": "Imovel excluído com sucesso"
                    });
                }
                ).catch((error) => {
                    res.status(500).json({
                        error: 'Erro ao excluir imovel',
                        details: error.message
                    });
                }
                );
            } else {
                res.status(400).json({ error: 'ID inválido' });
            }
        } else {
            res.status(400).json({ error: 'Método não permitido' });
        }
    }

    consultar(req, res) {

        const id = req.params.imo_id;
        let termo;

        if (!isNaN(id)) {
            termo = id;
        } else {
            termo = '';
        }

        const imovelModel = new Imovel();
        imovelModel.consultar(termo)
            .then((ListaImoveis) => {
                res.status(200).json({
                    status: true,
                    message: "Pessoa consultada com sucesso",
                    pessoas: ListaPessoas
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Erro ao consultar pessoa',
                    details: error.message
                });
            });
    }

}
