import '../index.css';
import * as React from 'react';
import { useState } from 'react';
import MockData from '../MOCK_DATA.json';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
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
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal2, setOpenModal2] = useState(false);
    const [selectedRow2, setSelectedRow2] = useState(null);
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

    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('id');

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === "asc");
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    };

    const sortedMockData = (mockArray, comparator) => {
        const stabilizedMockArray = mockArray.map((el, index) => [el, index]);
        stabilizedMockArray.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedMockArray.map((el) => el[0]);
    };

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleStatusChange = (id, action) => {
        const updatedData = data.map((row) => {
            if (row.id === id) {
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
        setData(updatedData);
    };

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRow(null);
    };
    const handleOpenModal2 = (row) => {
        setSelectedRow2(row);
        setOpenModal2(true);
    };

    const handleCloseModal2 = () => {
        setOpenModal2(false);
        setSelectedRow2(null);
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
                                                                style={getStatusStyle(value)}
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
                                                                <i
                                                                    className="ri-eye-fill eye__icon"
                                                                    onClick={() => handleOpenModal(row)}
                                                                    style={{ cursor: 'pointer' }}
                                                                ></i>
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
                                                                <i className="ri-edit-box-line edit__icon"
                                                                    onClick={() => handleOpenModal2(row)}
                                                                    style={{ cursor: 'pointer' }}
                                                                ></i>
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
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="xl" >
                <DialogActions>
                    <Button onClick={handleCloseModal}><i className="ri-close-large-line close__large__icon"></i></Button>
                </DialogActions>
                <DialogTitle className="view__information">View Information</DialogTitle>
                <DialogContent className="dialog__content__scroll">
                    {selectedRow && (
                        <>
                            <div className="container mx-auto px-4">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6'>
                                    <TextField
                                        disabled
                                        label="First Name (Thai):"
                                        defaultValue={selectedRow.first_name}
                                    />
                                    <TextField
                                        disabled
                                        label="Last Name (Thai):"
                                        defaultValue={selectedRow.last_name}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="First Name (English):"
                                        defaultValue={selectedRow.first_name}
                                    />
                                    <TextField
                                        disabled
                                        label="Last Name (English):"
                                        defaultValue={selectedRow.last_name}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="Email:"
                                        defaultValue="nantapat1997@gmail.com"
                                    />
                                    <TextField
                                        disabled
                                        label="Phone Number:"
                                        defaultValue="0895847859"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="Education:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        disabled
                                        label="Profession:"
                                        defaultValue="Computer Engineering"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="Education:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        disabled
                                        label="Profession:"
                                        defaultValue="Computer Engineering"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="Organization:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        disabled
                                        label="Area of Interest:"
                                        defaultValue="Web Development"
                                    />
                                </div>
                                <p className="experience__text">Experience</p>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6'>
                                    <TextField
                                        disabled
                                        label="Experience:"
                                        defaultValue="ประสบการณ์การเป็นหัวหน้าโครงการวิจัยหรือผู้ร่วมวิจัย"
                                    />
                                    <TextField
                                        disabled
                                        label="Company:"
                                        defaultValue="Learn Tech"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        disabled
                                        label="Start Date:"
                                        defaultValue="10-24-2024"
                                    />
                                    <TextField
                                        disabled
                                        label="Still Working:"
                                        defaultValue="Yes"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={openModal2} onClose={handleCloseModal2} fullWidth maxWidth="xl" >
                <DialogActions>
                    <Button onClick={handleCloseModal2}><i className="ri-close-large-line close__large__icon"></i></Button>
                </DialogActions>
                <DialogTitle className="view__information">View Information</DialogTitle>
                <DialogContent className="dialog__content__scroll">
                    {selectedRow2 && (
                        <>
                            <div className="container mx-auto px-4">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6'>
                                    <TextField
                                        label="First Name (Thai):"
                                        defaultValue={selectedRow2.first_name}
                                    />
                                    <TextField
                                        label="Last Name (Thai):"
                                        defaultValue={selectedRow2.last_name}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="First Name (English):"
                                        defaultValue={selectedRow2.first_name}
                                    />
                                    <TextField
                                        label="Last Name (English):"
                                        defaultValue={selectedRow2.last_name}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="Email:"
                                        defaultValue="nantapat1997@gmail.com"
                                    />
                                    <TextField
                                        label="Phone Number:"
                                        defaultValue="0895847859"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="Education:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        label="Profession:"
                                        defaultValue="Computer Engineering"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="Education:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        label="Profession:"
                                        defaultValue="Computer Engineering"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="Organization:"
                                        defaultValue="Thammasat University"
                                    />
                                    <TextField
                                        label="Area of Interest:"
                                        defaultValue="Web Development"
                                    />
                                </div>
                                <p className="experience__text">Experience</p>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6'>
                                    <TextField
                                        label="Experience:"
                                        defaultValue="ประสบการณ์การเป็นหัวหน้าโครงการวิจัยหรือผู้ร่วมวิจัย"
                                    />
                                    <TextField
                                        label="Company:"
                                        defaultValue="Learn Tech"
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-6 mt-10'>
                                    <TextField
                                        label="Start Date:"
                                        defaultValue="10-24-2024"
                                    />
                                    <TextField
                                        label="Still Working:"
                                        defaultValue="Yes"
                                    />
                                </div>
                                <div className="flex justify-end mt-10">
                                <Button
                                    variant="contained"
                                    className="button__contained"
                                    onClick={() => console.log('Save button clicked')}
                                >
                                    บันทึก
                                </Button>
                            </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SortingTable;
