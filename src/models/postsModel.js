import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa a função para conectar ao banco de dados, definida em dbConfig.js.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Estabelece a conexão com o banco de dados usando a string de conexão obtida da variável de ambiente.

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); // Obtém o banco de dados "imersao-instabytes" da conexão.
    const colecao = db.collection("posts"); // Obtém a coleção "posts" do banco de dados.
    return colecao.find().toArray(); // Retorna todos os documentos da coleção "posts" em um array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}