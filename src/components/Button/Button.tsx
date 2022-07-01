import React from 'react';
import './Button.css';

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: ButtonProps) {
  const { children, className = 'primary', onClick } = props;
  return (
    <button onClick={onClick} className={'Button ' + className}>
      {children}
    </button>
  );
}

export default Button;
