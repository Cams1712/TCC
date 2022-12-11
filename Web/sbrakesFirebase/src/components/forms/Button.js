import { Link } from 'react-router-dom';

// Componente de Botão (Forms)
export default function Button(props) {
  if (props.bool)
    return (
      <Link to={props.path} className={props.classe}>
        {props.value}
      </Link>
    );
  else return <button className={props.classe}>{props.value}</button>;
}
