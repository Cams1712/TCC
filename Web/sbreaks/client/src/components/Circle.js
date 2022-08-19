import React from 'react'

const Circle = ({children, estilo}) => {
  return <div className={estilo}>
    {children}
  </div>
}

export default Circle