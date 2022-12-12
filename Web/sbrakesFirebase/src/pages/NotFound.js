import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentContext } from '../hooks/useComponentContext';

export default function NotFound() {
  const { setDisplay } = React.useContext(ComponentContext);

  React.useEffect(() => {
    setDisplay(true);
  }, [setDisplay]);

  return (
    <div>
      <p>Erro 404. Página da web não encontrada</p>
      <Link to="/">Página inicial</Link>
    </div>
  );
}
