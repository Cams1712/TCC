import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({classe, id}) => {
  return <Link to='/' className={classe} id={id}>SBRAKES</Link>
}

export default Logo