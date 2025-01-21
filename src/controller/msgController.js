import { apagarMensagem, atualizarMsg, buscarMsgPorTipo, criarMensagem, getTodasMensagens } from "../models/msgModels.js";

// Função para listar todas as mensagens
export async function listarMensagens(req, res) {
    // Chama a função para pegar as mensagens no banco
    const mensagens = await getTodasMensagens();
    res.status(200).json(mensagens);
};

// Função para filtrar a mensagem por tipo
export async function msgPorTipo(req ,res) {

    try {
        const tipo = req.params.tipo;
        const msgEncontrada = await buscarMsgPorTipo(tipo);
        res.status(200).json(msgEncontrada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na pesquisa de mensagem por tipo."});
    }
};

// Função para adicionar/criar uma nova mensagem
export async function adicionarMsg(req, res) {
    // Requisição do cabeçalho para enviar a nova mensagem
    const novaMensagem = req.body;
    // Try para realização do envio
    try {
        const mensagemCriada = await criarMensagem(novaMensagem);
        res.status(200).json(mensagemCriada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição de adicionar."});
    }
}

// Função para atualizar uma mensagem pelo seu ID
export async function modificarMsg(req, res) {
    const id = req.params.id
    const msgAtualizada = {
        tipo: req.body.tipo,
        mensagem: req.body.mensagem
    }

    try {
        const mensagemAtualizada = await atualizarMsg(id, msgAtualizada);
        res.status(200).json(mensagemAtualizada);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição de atualizar."});
    }
}

// Função para deletar uma mensagem pelo seu ID
export async function deletarMsg(req, res) {
    const id = req.params.id 
    try {

        const mensagemDeletada = await apagarMensagem(id);
        res.status(200).json({ mensagem: "Mensagem deletada com sucesso", mensagemDeletada});
    } catch (erro) {
        console.error(erro.messsage);
        res.status(500).json({"Erro":"Falha na requisição de delete."})
    }
}
