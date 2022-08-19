// Seção de imports
import React, { useRef } from "react";
import "../css/Cadastrar.css";

import Head from "./Head";
import Axios from "axios";

import { Link } from "react-router-dom";
import { Saudacao } from "../class/Saudacao";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LocalStorage from "../hooks/LocalStorage";

const Cadastrar = () => {
  const imgFile = useRef();

  const inputField = [
    {
      id: "nome",
      type: "text",
      label: "Nome",
    },
    {
      id: "email",
      type: "text",
      label: "Email",
      complete: "username",
    },
    {
      id: "senha",
      type: "password",
      label: "Senha",
      complete: "current-password",
    },
    {
      id: "img",
      type: "file",
      label: "Selecionar imagem",
      accept: "image/png,image/jpeg",
      idLabel: "foto",
      icon: <AiOutlineCloudUpload size={25} color="gray" />,
      ref: imgFile,
    },
    {
      id: "enviar",
      type: "submit",
    },
  ];

  const [file, setFile] = React.useState(null)
  const [register, setRegister] = React.useState({
    nome: "",
    email: "",
    senha: "",
    img: "",
    enviar: "Cadastrar",
  });

  function handleSubmit(e) {
    const { nome, email, senha, img } = register;
    e.preventDefault();

    if (nome && email && senha && img) {
      Axios.post("http://localhost:8080/cadastrar", {
        nome: nome,
        email: email,
        senha: senha,
        img: img,
      });

      <LocalStorage key='email' value={email} />

    } else {
      console.log("Erro! preencha os campos corretamente");
    }
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setRegister({ ...register, [id]: value });

    console.log(imgFile.current.files);
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
                { id, type, label, idLabel, accept, complete, icon, ref },
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
                    autoComplete={complete}
                    ref={ref}
                  />
                </div>
              )
            )}
          </form>

          <span>
            Não possui uma conta?{" "}
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
