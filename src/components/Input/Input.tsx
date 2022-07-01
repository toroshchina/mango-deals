import React from 'react';
import './Input.css';

type InputProps = {
  value?: string | number;
  label?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

function Input(props: InputProps) {
  const {
    className = '',
    onChange,
    label = '',
    value = '',
    type = 'text',
    disabled = false,
  } = props;
  return (
    <label className="InputLabel">
      {label}
      <input
        disabled={disabled}
        className={'Input ' + className}
        onChange={onChange}
        type={type}
        value={value}
        step=".01"
      />
    </label>
  );
}

export default Input;
