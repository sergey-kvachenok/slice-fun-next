// libraries
import { MouseEventHandler } from 'react'
import Button from '@mui/material/Button'
import { colors } from 'src/utils/theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        color: colors.darkBlue1,
        textTransform: 'capitalize',
        border: `2px solid ${colors.darkBlue1}`,
        borderRadius: 4,
        transition: '0.6s',

        '&:active': {
            color: colors.pink,
            border: `2px solid ${colors.pink}`
        },

        ['@media (hover: hover)']: {
            '&:hover': {
                color: colors.pink,
                border: `2px solid ${colors.pink}`
            }
        }
    }
})

type CustomButtonProps = {
    title: string
    variant?: 'text' | 'outlined' | 'contained' | undefined
    customStyles?: object
    onClick?: MouseEventHandler<HTMLButtonElement>
    dataTestId?: string
}

const CustomButton = ({
    title,
    variant = 'outlined',
    dataTestId = 'custom-button',
    customStyles = {},
    onClick = () => {}
}: CustomButtonProps) => {
    const classes = useStyles()

    return (
        <Button className={classes.root} variant={variant} size="small" data-testid={dataTestId} onClick={onClick}>
            {title}
        </Button>
    )
}
export default CustomButton
