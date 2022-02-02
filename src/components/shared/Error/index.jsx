import Alert from '@mui/material/Alert'
import { makeStyles } from '@mui/styles'
import { zIndexes } from 'src/utils/theme'

const useStyles = makeStyles(() => ({
    fixed: {
        position: 'fixed',
        width: '100%',
        zIndex: zIndexes.offlineBanner
    }
}))

const Error = ({ message, customClassName }) => {
    const classes = useStyles()

    return (
        <Alert className={classes[customClassName]} severity="error">
            {message}
        </Alert>
    )
}

export default Error
