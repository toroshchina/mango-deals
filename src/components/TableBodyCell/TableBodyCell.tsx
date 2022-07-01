import React from 'react';
import './TableBodyCell.css';

type TableBodyCellProps = {
  children?: React.ReactNode;
  className?: string;
  colspan?: number;
};

function TableBodyCell(props: TableBodyCellProps) {
  const { children, className = '', colspan = 1 } = props;
  return (
    <td className={'TableBodyCell ' + className} colSpan={colspan}>
      {children}
    </td>
  );
}

export default TableBodyCell;
