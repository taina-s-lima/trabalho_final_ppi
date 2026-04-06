import { Router } from "express";
import PessoaController from "../Controller/PessoaController.js";

const rotaPessoas = Router();
const pessoaController = new PessoaController();

rotaPessoas.get("/pessoas", pessoaController.consultar);
rotaPessoas.get("/pessoas/:cpf", pessoaController.consultar);
rotaPessoas.post("/pessoas", pessoaController.gravar);
rotaPessoas.put("/pessoas/:cpf", pessoaController.editar);
rotaPessoas.patch("/pessoas/:cpf", pessoaController.editar);
rotaPessoas.delete("/pessoas/:cpf", pessoaController.excluir);

export default rotaPessoas;