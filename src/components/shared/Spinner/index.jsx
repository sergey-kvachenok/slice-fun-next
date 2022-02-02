import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { colors } from 'src/utils/theme'

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress sx={{ color: colors.darkBlue1 }} />
        </Box>
    )
}

export default Spinner
