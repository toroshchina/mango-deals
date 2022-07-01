import React, { useRef, useEffect } from 'react';
import './TableBodyRow.css';

type TableBodyRowProps = {
  children?: React.ReactNode;
  className?: string;
  onHover?: (index: number) => void;
  index?: number;
};

function TableBodyRow(props: TableBodyRowProps) {
  const { children, className = '', onHover = () => {}, index = -1 } = props;
  const rowRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    const setHightlight = () => {
      onHover(index);
    };
    const removeHightlight = () => {
      onHover(-1);
    };
    let node = null as HTMLTableRowElement | null;
    if (rowRef.current) {
      node = rowRef.current;
      node.addEventListener('mouseenter', setHightlight);
      node.addEventListener('mouseleave', removeHightlight);
    }
    return () => {
      if (node) {
        node.removeEventListener('mouseenter', setHightlight);
        node.removeEventListener('mouseleave', removeHightlight);
      }
    };
  }, [rowRef, onHover, index]);
  return (
    <tr ref={rowRef} className={'TableBodyRow ' + className}>
      {children}
    </tr>
  );
}

export default TableBodyRow;
