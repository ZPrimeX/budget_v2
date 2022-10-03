import React from 'react'
import { Box, Typography } from '@mui/material'


const ReportContainer = () => {
    return (
        <>
            <Box>
                <Box display={'flex'} justifyContent='space-evenly'>
                    <Box>
                        <Typography>Income</Typography>
                    </Box>
                    <Box>
                        <Typography>Expense</Typography>
                    </Box>
                </Box>
                <Box display='flex' flexDirection={'column'}>
                    <Box display='flex' justifyContent={'space-around'}><Typography>Dept</Typography><Typography>$ 0</Typography></Box>
                    <Box display='flex' justifyContent={'space-around'}><Typography>Loan</Typography><Typography>$ 0</Typography></Box>
                    <Box display='flex' justifyContent={'space-around'}><Typography>Other</Typography><Typography>$ 0</Typography></Box>
                </Box>
            </Box>
        </>
    )
}

export default ReportContainer