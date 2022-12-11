import Is from './Input.module.css';

export default function Input(props) {
  return (
    <>
      <label htmlFor={props.id} className={Is.Label}>
        {props.label}
      </label>
      <input
        autoComplete="off"
        type={props.type}
        value={props.value}
        id={props.id}
        placeholder={props.text}
        className={`${Is.Input} ${props.classe}`}
        onChange={props.event}
        style={props.styles}
        {...props}
      />
    </>
  );
}
