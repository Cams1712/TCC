import React, { useRef } from "react";
import Head from "./Head";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Saudacao } from "../class/Saudacao";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "../css/Cadastrar.css";
import axios from "axios";

const inputField = [
  {
    id: "nome",
    type: "text",
    label: "Nome",
  },
  {
    id: "credencial",
    type: "text",
    label: "Credencial",
  },
  {
    id: "email",
    type: "text",
    label: "Email",
  },
  {
    id: "senha",
    type: "password",
    label: "Senha",
  },
  {
    id: "img",
    type: "file",
    label: "Selecionar imagem",
    accept: "image/png,image/jpeg",
    idLabel: "foto",
    icon: <AiOutlineCloudUpload size={25} color="gray" />,
  },
  {
    id: "enviar",
    type: "submit",
  }
]

const Cadastrar = () => {
  const [register, setRegister] = React.useState({
    nome: "",
    credencial: "",
    email: "",
    senha: "",
    img: "",
    enviar: "Cadastrar",
  });

  const [erro, setErro] = React.useState(null)

  function handleChange({ target }) {
    const { id, value } = target;
    setRegister({ ...register, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { nome, credencial, email, senha, img } = register;

    if (nome && email && senha && img) {
      Axios.post("http://localhost:8080/cadastrar", {
        nome: nome,
        credencial: credencial,
        email: email,
        senha: senha,
        img: img,
      });

    } else {
      console.log('ERRO')
    }
  }

  return (
    <>
      <Head title="Register" />

      <div className="row register-container">
        <div className="col-md-7 register-form">
          <form className="reg-form" onSubmit={handleSubmit}>
            <div>
              <h2>{Saudacao()}</h2>
              <p style={{ color: "gray" }}>Cadastre-se para acessar</p>
            </div>
            {inputField.map(
              (
                { id, type, label, idLabel, accept, icon },
                index
              ) => (
                <div className="reg-inputs" key={index}>
                  <label htmlFor={id} id={idLabel}>
                    {label} {icon}
                  </label>
                  <input
                    type={type}
                    id={id}
                    accept={accept}
                    value={register[id]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </form>

          <span>
            Não possui uma conta? {" "}
            <Link to="/login" className="reg-cadastrar">
              Fazer login
            </Link>
          </span>
        </div>

        <div className="col-md-4 register-img"></div>
      </div>
    </>
  );
};

export default Cadastrar;
