import Button from '@mui/material/Button'
import { colors } from 'src/utils/theme'

const defaultStyles = {
    textTransform: 'capitalize',
    transition: '0.6s',

    '&, &:focus': {
        border: 2,
        color: colors.darkBlue1
    },

    '&:active': {
        border: 2,
        color: colors.pink
    },

    '@media (hover: hover)': {
        '&:hover': {
            color: colors.pink,
            border: 2
        }
    }
}

const CustomButton = ({
    title,
    variant = 'outlined',
    dataTestId = 'custom-button',
    customStyles = {},
    onClick = () => {}
}) => {
    return (
        <Button
            data-testid={dataTestId}
            variant={variant}
            sx={{ ...defaultStyles, ...customStyles }}
            size="small"
            onClick={onClick}
        >
            {title}
        </Button>
    )
}
export default CustomButton
