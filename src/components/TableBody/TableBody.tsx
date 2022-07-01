import React from 'react';
import './TableBody.css';

type TableBodyProps = {
  children?: React.ReactNode;
};

function TableBody(props: TableBodyProps) {
  return <tbody className="TableBody">{props.children}</tbody>;
}

export default TableBody;
