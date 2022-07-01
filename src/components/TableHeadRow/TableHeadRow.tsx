import React from 'react';
import './TableHeadRow.css';

type TableHeadRowProps = {
  children?: React.ReactNode;
};

function TableHeadRow(props: TableHeadRowProps) {
  return <tr className="TableHeadRow">{props.children}</tr>;
}

export default TableHeadRow;
