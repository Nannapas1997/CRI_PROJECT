import '../index.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'remixicon/fonts/remixicon.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
function Header() {
    return (
        <div className="container mx-auto px-4">
            <p className='registration__text mt-20'>REGISTRATION EXPERT APPROVAL</p>
            <FormControl fullWidth>
                <InputLabel className='mt-16' htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput
                    className="width__outline mt-16 bg-white"
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"><i className="ri-search-line"></i></InputAdornment>}
                    label="Amount"
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
    );
}

export default Header;