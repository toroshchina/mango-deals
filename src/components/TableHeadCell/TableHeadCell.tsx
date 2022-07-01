import React from 'react';
import './TableHeadCell.css';

type TableHeadCellProps = {
  children?: React.ReactNode;
};

function TableHeadCell(props: TableHeadCellProps) {
  return <th className="TableHeadCell">{props.children}</th>;
}

export default TableHeadCell;
