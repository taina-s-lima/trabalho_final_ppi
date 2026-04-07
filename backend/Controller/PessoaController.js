import Pessoa from '../Model/Pessoa.js';
import Imovel from '../Model/Imovel.js';

export default class PessoaController {

    gravar(req, res) {
        if (req.method === 'POST' && req.is('application/json')) {

            const cpf = req.body.cpf;
            const nome = req.body.nome;
            const telefone = req.body.telefone;
            const email = req.body.email;

            if (cpf && nome && telefone && email) {

                const pessoaModel = new Pessoa(cpf, nome, telefone, email);
                pessoaModel.gravar().then((result) => {

                    res.status(201).json({
                        "status": true,
                        "message:": "Pessoa cadastrada com sucesso",
                        "id": pessoaModel.id
                    })

                }).catch((error) => {
                    res.status(500).json({ error: 'Erro ao cadastrar pessoa', details: error.message });
                });
            } else {
                res.status(400).json({ error: 'Dados incompletos' });
            }

        } else {
            res.status(400).json({ error: 'Método não permitido' });
        }
    }

    editar(req, res) {
    console.log("=== EDITAR PESSOA ===");
    console.log("Método recebido:", req.method);
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Body recebido:", req.body);

    if ((req.method === 'PUT' || req.method === 'PATCH') && req.is('application/json')) {
        const cpf = req.body.cpf;
        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const email = req.body.email;

        console.log("Valores extraídos:");
        console.log("CPF:", cpf);
        console.log("Nome:", nome);
        console.log("Telefone:", telefone);
        console.log("Email:", email);

        if (nome && cpf && telefone && email) {
            console.log("Todos os dados necessários estão presentes. Criando modelo...");

            const pessoaModel = new Pessoa(cpf, nome, telefone, email);

            console.log("Objeto Pessoa criado:", pessoaModel);

            pessoaModel.atualizar()
                .then((result) => {
                    console.log("Atualização realizada com sucesso:", result);
                    res.status(200).json({
                        status: true,
                        message: "Pessoa atualizada com sucesso"
                    });
                })
                .catch((error) => {
                    console.error("Erro no método atualizar:", error);
                    res.status(500).json({
                        error: 'Erro ao atualizar pessoa',
                        details: error.message
                    });
                });
        } else {
            console.warn("Dados incompletos. Falta algum campo.");
            res.status(400).json({ error: 'Dados incompletos' });
        }
    } else {
        console.warn("Método não permitido ou Content-Type incorreto.");
        res.status(400).json({ error: 'Método não permitido' });
    }
}

    excluir(req, res) {
        if (req.method === 'DELETE') {
            const cpf = req.params.cpf;
            console.log(cpf);
            if (cpf > 0) {
                const pessoaModel = new Pessoa(cpf);
                pessoaModel.excluir().then((result) => {
                    res.status(200).json({
                        "status": true,
                        "message": "Pessoa excluída com sucesso"
                    });
                }
                ).catch((error) => {
                    res.status(500).json({
                        error: 'Erro ao excluir pessoa',
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

        const id = req.params.cpf;
        let termo;

        if (!isNaN(id)) {
            termo = id;
        } else {
            termo = '';
        }

        const pessoaModel = new Pessoa();

        pessoaModel.consultar(termo)
            .then((ListaPessoas) => {
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
