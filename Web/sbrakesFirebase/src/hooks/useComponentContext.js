import React from 'react';

// Modificar renderização dos meus componentes
export const ComponentContext = React.createContext();

export function ComponentProvider({ children }) {
  const [display, setDisplay] = React.useState(false);

  return (
    <ComponentContext.Provider value={{ display, setDisplay }}>
      {children}
    </ComponentContext.Provider>
  );
}
