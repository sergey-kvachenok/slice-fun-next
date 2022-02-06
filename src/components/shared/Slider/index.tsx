// libraries
import { Slider } from '@mui/material'
import styled from '@emotion/styled'
// utils
import { colors } from 'src/utils/theme'

const CustomSlider = styled(Slider, {
    shouldForwardProp: (prop) => prop !== 'trackColor' && prop !== 'sliderColor'
})<{ trackColor?: string; sliderColor?: string }>(({ theme, trackColor, sliderColor }) => ({
    color: sliderColor,
    height: 6,
    padding: 0,

    ['@media (pointer: coarse)']: {
        padding: 0
    },

    '& .MuiSlider-track': {
        color: trackColor,
        border: 'none'
    },

    '& .MuiSlider-rail': {
        opacity: 1
    },

    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: colors.pink,
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit'
        },
        '&:before': {
            display: 'none'
        }
    }
}))

export default CustomSlider
