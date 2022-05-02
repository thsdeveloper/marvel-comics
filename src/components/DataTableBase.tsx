import React from 'react'
import DataTable, { TableProps } from 'react-data-table-component'

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return <DataTable pagination {...props} />
}

export default DataTableBase
