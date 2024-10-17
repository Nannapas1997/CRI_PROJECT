import '../index.css';
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
const columns = [
    { id: 'id', label: 'NO.', minwidth: 100 },
    { id: 'username', label: 'USERNAME', minwidth: 200, align: 'left', format: (value) => value.toLocaleString('en-US') },
    { id: 'first_name', label: 'FIRST NAME', minwidth: 400, align: 'left', format: (value) => value.toLocaleString('en-US') },
    { id: 'last_name', label: 'LAST NAME', minwidth: 300, align: 'left', format: (value) => value.toLocaleString('en-US') },
    { id: 'status', label: 'STATUS', minwidth: 130, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'view_information', label: 'VIEW INFORMATION', minwidth: 150, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'action', label: 'ACTION', minwidth: 600, align: 'center', format: (value) => value.toLocaleString('en-US') },
]
export default function TableHeader(props) {
    const { valueToOrderBy, orderDirection, handleRequestSort } = props
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key={column.id || index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className='font__prompt min__width'
                    >
                        {['id', 'username', 'status'].includes(column.id) ? (
                            <TableSortLabel
                                active={valueToOrderBy === column.id}
                                direction={valueToOrderBy === column.id ? orderDirection : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                            </TableSortLabel>
                        ) : (
                            // For non-sortable columns, just display the label
                            column.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}