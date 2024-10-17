import { dividerClasses } from '@mui/material';
import '../index.css';
import * as React from 'react';
import { useState } from 'react';
import MockData from '../MOCK_DATA.json';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHeader from '../components/TableHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'remixicon/fonts/remixicon.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
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
    const [data, setData] = useState(MockData);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = useState('');
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
    const [orderDirection, setOrderDirection] = React.useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = React.useState('id')
    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === "asc")
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')

    }
    const sortedMockData = (mockArray, comparator) => {
        const stabilizedMockArray = mockArray.map((el, index) => [el, index])
        stabilizedMockArray.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedMockArray.map((el) => el[0])
    }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }
    const handleStatusChange = (id, action) => {
        const updatedData = data.map((row) => {
            if (row.id === id) {
                // Update the status based on the current status and the action
                if (action === 'Approved') {
                    if (row.status === 'Waiting' || row.status === 'Reject') {
                        return { ...row, status: 'Approved' };
                    }
                } else if (action === 'Reject') {
                    if (row.status === 'Waiting' || row.status === 'Approved') {
                        return { ...row, status: 'Reject' };
                    }
                }
            }
            return row;
        });
        setData(updatedData);  // Update the state with the new data
    };
    const filteredRows = sortedMockData(MockData, getComparator(orderDirection, valueToOrderBy)).filter((data) => {
        return Object.values(data).some(
            (value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    return (
        <>
            <div className="container mx-auto px-4">
                <p className='registration__text mt-20'>REGISTRATION EXPERT APPROVAL</p>
                <FormControl fullWidth>
                    <InputLabel className='mt-16' htmlFor="outlined-adornment-amount">Search</InputLabel>
                    <OutlinedInput
                        className="width__outline mt-16 bg-white"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start"><i className="ri-search-line"></i></InputAdornment>}
                        label="Amount"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={2} direction="row" className='flex justify-end mt-12'>
                    <Button variant="outlined" className='outline__button'>
                        <i className="ri-upload-2-fill upload__icon"></i>
                        &nbsp;&nbsp;Upload Batch Registration
                    </Button>
                    <Button variant="contained" className="contained__button">
                        <i className="ri-download-2-fill"></i>
                        &nbsp;&nbsp;Download .CSV FILE
                    </Button>
                </Stack>
            </div>
            <div className="container mx-auto px-4 mt-6">
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: 1000 }} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHeader
                                valueToOrderBy={valueToOrderBy}
                                orderDirection={orderDirection}
                                handleRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {filteredRows
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
                                                                <i className="ri-check-line check__icon"
                                                                onClick={() => handleStatusChange(row.id, 'Approved')}
                                                                style={{ cursor: 'pointer' }}
                                                                ></i>
                                                                <i className="ri-close-line close__icon"
                                                                 onClick={() => handleStatusChange(row.id, 'Reject')}
                                                                 style={{ cursor: 'pointer' }}
                                                                ></i>
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
        </>

    );
}
export default SortingTable;