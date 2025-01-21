import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conexão ao banco utilizando s string de conexão fornecida como variável
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todas as mensagens no banco
export async function getTodasMensagens() {
    // Seleciona o banco de dados criado
    const db = conexao.db("mensagens-projeto");
    // Seleciona a coleção criada no banco
    const colecao = db.collection("mensagens");
    // Retorna um array com todos os documentos da coleção "mensagens"
    return colecao.find().toArray();
}

// Função assíncrona para buscar as mensagens pelo tipo
export async function buscarMsgPorTipo(tipo) {
    const db = conexao.db("mensagens-projeto");
    const colecao = db.collection("mensagens");
    // Cria um objeto de filtro para buscar pelo campo "tipo"
    const filtro = { tipo: tipo};

    try {
        const mensagens = await colecao.find(filtro).toArray();
        return mensagens;
    } catch (erro) {
        console.error(erro.message);
        throw new Error("Falha na pesquisa de mensagem por tipo.");
    }
}

// Função assíncrona para criar uma nova mensagem é salva no banco
export async function criarMensagem(novaMensagem) {
    const db = conexao.db("mensagens-projeto");
    const colecao = db.collection("mensagens");
    return colecao.insertOne(novaMensagem);
}

// Função assíncrona para atualizar uma mensagem já no banco
export async function atualizarMsg(id, novaMsg) {
    const db = conexao.db("mensagens-projeto");
    const colecao = db.collection("mensagens");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novaMsg});
}

// Função assíncrona para deletar uma mensagem do banco
export async function apagarMensagem(id) {
    const db = conexao.db("mensagens-projeto");
    const colecao = db.collection("mensagens");
    
    // Cria um objeto de filtro para buscar pelo campo "_id"
    const filtro = { _id: new ObjectId(id) };

    try {
        const resultado = await colecao.deleteOne(filtro);
        return resultado;
    } catch (erro) {
        console.error(erro.message);
        throw new Error("Falha ao deletar mensagem.");
    }
}
