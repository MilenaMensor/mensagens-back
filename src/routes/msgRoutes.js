import express from  "express";
import cors from "cors";
import { adicionarMsg, deletarMsg, listarMensagens, modificarMsg, msgPorTipo } from "../controller/msgController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200

}

const routes = (app) => {
    // Permite que o servidor interprete requisições com o corpo JSON
    app.use(express.json());
    // Avisa que vai ter outra porta de localhost
    app.use(cors(corsOptions));
    // Rota para listar todas as mensagens
    app.get("/mensagens", listarMensagens);
    // Rota para listar as mensagens pelo tipo
    app.get("/mensagens/:tipo", msgPorTipo);
    // Rota para adicionar uma nova mensagem
    app.post("/mensagens", adicionarMsg);
    // Rota para atualizar uma mensagem já postada
    app.put("/atualizar/:id", modificarMsg);
    // Rota para deletar uma mensagem pelo ID
    app.delete("/mensagens/:id", deletarMsg);
}

export default routes;
