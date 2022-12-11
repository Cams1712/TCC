import React from 'react';
import Ss from './Select.module.css';

export default function Select({ valueDisabled, id, label, options, event }) {
  return (
    <>
      <label htmlFor={id} className={Ss.Label}>
        {label}
      </label>
      <select className={Ss.Select} id={id} onChange={event}>
        <option value={valueDisabled}>{valueDisabled}</option>
        {options.map((funcionario, index) => (
          <option value={funcionario.data().Nome} key={index}>
            {funcionario.data().Nome}
          </option>
        ))}
      </select>
    </>
  );
}
