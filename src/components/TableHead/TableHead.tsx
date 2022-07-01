import React from 'react';
import './TableHead.css';

type TableHeadProps = {
  children?: React.ReactNode;
};

function TableHead(props: TableHeadProps) {
  return <thead className="TableHead">{props.children}</thead>;
}

export default TableHead;
