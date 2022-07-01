import React from 'react';
import './Table.css';

type TableProps = {
  children?: React.ReactNode;
};

function Table(props: TableProps) {
  return (
    <div className="TableWrapper">
      <table className="Table">{props.children}</table>
    </div>
  );
}

export default Table;
