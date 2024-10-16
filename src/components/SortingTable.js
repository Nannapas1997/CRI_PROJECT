import { dividerClasses } from '@mui/material';
import '../index.css';
import * as React  from 'react';
import 'remixicon/fonts/remixicon.css';
import MockData from '../MOCK_DATA.json';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SortIcon from '../assets/images/sort.png';
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
function SortingTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Waiting':
                return { color: '#072482' };
            case 'Reject':
                return { color: '#C2070A' };
            case 'Approved':
                return { color: '#006441' };
            default:
                return {};
        }
    };
    return (
        <div className="container mx-auto px-4 mt-6">
            <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                <TableContainer sx={{ maxHeight: 1000 }} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.id || index}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className='font__prompt min__width'
                                    >
                                        {/* Conditionally render an image based on column.id */}
                                        {column.id === "id" && (
                                            <>
                                               <TableSortLabel
                                                active={"id" === "id"}
                                               >
                                                {column.label}
                                               </TableSortLabel>
                                            </>
                                        )}
                                        {column.id === "username" && (
                                            <>
                                                {column.label}
                                                <img src={SortIcon} alt="Username Icon" style={{ width: '30px', display:'inline', marginLeft: '10px', cursor: 'pointer'}} />
                                            </>
                                        )}
                                        {column.id === "status" && (
                                            <>
                                                 {column.label}
                                                <img src={SortIcon} alt="Status Icon" style={{width: '30px', display:'inline', marginLeft: '10px', cursor: 'pointer' }} />
                                            </>
                                        )}
                                        {/* For other columns, just display the label */}
                                        {column.id !== "id" && column.id !== "username" && column.id !== "status" && (
                                            column.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MockData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                if (column.id === 'status') {
                                                    return (
                                                        <TableCell
                                                            key={column.id || index}
                                                            align={column.align}
                                                            className="font__prompt"
                                                            style={getStatusStyle(value)} // Apply status-specific styles
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    );
                                                } else if (column.id === 'view_information') {
                                                    return (
                                                        <TableCell
                                                            key={column.id || index}
                                                            align={column.align}
                                                        >
                                                            <i className="ri-eye-fill eye__icon"></i>
                                                        </TableCell>
                                                    );
                                                } else if (column.id === 'action') {
                                                    return (
                                                        <TableCell
                                                            key={column.id || index}
                                                            align={column.align}
                                                        >
                                                            <i className="ri-check-line check__icon"></i>
                                                            <i className="ri-close-line close__icon"></i>
                                                            <i className="ri-edit-box-line edit__icon"></i>
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell key={column.id || index} align={column.align} className='font__prompt'>

                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}

                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={MockData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
export default SortingTable;