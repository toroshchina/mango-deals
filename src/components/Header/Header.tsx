import React from 'react';
import logo from '../../assets/logo.png';
import brandText from '../../assets/brand_text.svg';
import Button from '../Button/Button';
import './Header.css';

type HeaderProps = {
  onOpenDialog: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Header(props: HeaderProps) {
  const { onOpenDialog } = props;
  return (
    <div className="Header">
      <img src={logo} className="Header-logo" alt="logo" />
      <img src={brandText} className="Header-brand" alt="brand text" />
      <Button onClick={onOpenDialog}>New Deal</Button>
    </div>
  );
}

export default Header;
