const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Configurações do banco de dados
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234@abc",
  database: "testetcc",
});

app.use(cors());
app.use(express.json());

// Fazendo um post nos dados inseridos pelo usuário no forms de cadastro
app.post("/cadastrar", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { senha } = req.body;
  const { img } = req.body;

  let procurar = "SELECT * FROM usuarios WHERE Email = ?";
  let cadastrar = "INSERT INTO usuarios VALUES (?, ?, ?, ?, ?)";

  db.query(procurar, [email], (error, result) => {
    if (result.length === 1) {
      console.log("Email já está em uso");
    } else {
      db.query(
        cadastrar,
        [nome, email, senha, img, null],
        (error,
        (result) => {
          console.log(error);
          console.log("Conta criada com sucesso");
        })
      );
    }
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado");
});
