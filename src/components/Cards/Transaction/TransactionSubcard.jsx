import { Typography, Box } from '@mui/material'
import React from 'react'

const TransactionSubcard = () => {
    return (
        <>
            <Box p={2} display='flex' justifyContent='space-between'>
                <Box display={'flex'} gap={2}>
                    <Typography>19</Typography>
                    <Typography>Friday, August 2022</Typography>
                </Box>
                <Box display={'flex'} justifyContent='space-between'>
                    <Typography>+$ 150.00</Typography>
                </Box>
            </Box>
        </>
    )
}

export default TransactionSubcard