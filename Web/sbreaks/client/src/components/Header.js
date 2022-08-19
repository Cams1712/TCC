import React from "react";
import "../css/Header.css";
import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";

const Header = () => {
  const [header, setHeader] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [logo, setLogo] = React.useState("");
  const local = useLocation();

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 5) {
        setHeader("active")
    } else {
      setHeader("");
    }
  });

  React.useEffect(() => {
    if (local.pathname === "/login" || local.pathname === "/cadastrar") {
      setDisplay("none");
      setLogo("black");
    } else {
      setDisplay("");
      setLogo("white");
    }
  }, [local]);

  return (
    <header className="header" id={header}>
      <nav className="nav row">
        <div className="header-logo col-md-3 col-lg-3 col-5">
          <Logo classe="logo" id={logo} />
        </div>

        <ul className="nav-links col-sm-7" style={{ display: `${display}` }}>
          <li>
            <Link to="/">EMPRESA</Link>
          </li>
          <li>
            <Link to="/">CONTATO</Link>
          </li>
          <li>
            <Link to="/">SOBRE</Link>
          </li>
        </ul>

        <div
          className="header-login col-md-2"
          style={{ display: `${display}` }}
        >
          <Link to="login">
            <BiUserCircle size={25} color="white" className="header-user" />
          </Link>
        </div>

        <div className="header-mobile col-7">
          <AiOutlineMenu size={30} color={logo} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
