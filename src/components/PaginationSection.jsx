import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationSection = () => {
    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}
        marginTop={'1%'}
        >
            <Pagination
            count={5}
            variant='outlined'
            shape='rounded'
            />
        </Stack>
    );
};

export default PaginationSection;