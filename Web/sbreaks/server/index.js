const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// CONEXÃO COM O BANCO DE DADOS
const db = mysql.createPool({ host: "ESN509VMYSQL", user: "aluno", password: "Senai1234", database: "sbreaksteste" });

app.use(cors());
app.use(express.json());

function cadastrarPessoa() {
  app.post("/cadastrar", (req, res) => {
    // REQUISIÇÃO DOS DADOS INSERIDOS PELO USUÁRIO NO FORMULÁRIO DE CADASTRO 
    const { img } = req.body
    const { credencial } = req.body
    const { nome } = req.body
    const { email } = req.body
    const { senha } = req.body

    // CADASTRO AUTORIZADO PARA ADMs. LOGO, SEMPRE VAI SER TRUE
    const adm = true

    // VERIFICANDO SE HÁ USUÁRIO CADASTRADO
    let pesquisar = "SELECT * FROM funcionarios WHERE num_funcionario = ?"
    db.query(pesquisar, [credencial], (error, result) => {
      if (result.length === 1) {
        console.log(error)
        console.log('Usuário já foi cadastrado')
      } else {
        let cadastrar = "INSERT INTO funcionarios VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(cadastrar, [credencial, img, nome, email, senha, adm, false], (error, result => {
          console.log(error)
          console.log('Usuário cadastrado com sucesso')
        }))
      }
    })
  });
}

function listarFuncionarios() {

}

app.listen(8080, () => {
  console.log('Servidor Iniciado em http://localhost:8080')
  cadastrarPessoa()
});
