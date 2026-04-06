import { Router } from "express";
import ImovelController from "../Controller/ImovelController.js";

const rotaImovel = Router();
const imovelController = new ImovelController();

rotaImovel.get("/imoveis", imovelController.consultar);
rotaImovel.get("/imoveis/:id", imovelController.consultar);
rotaImovel.post("/imoveis", imovelController.gravar);
rotaImovel.put("/imoveis/:id", imovelController.editar);
rotaImovel.delete("/imoveis/:id", imovelController.excluir);

export default rotaImovel;