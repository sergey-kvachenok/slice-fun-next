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
        '&:before, &:after': {
            display: 'none'
        }
    }

    // '& .MuiSlider-valueLabel': {
    //     lineHeight: 1.2,
    //     fontSize: 12,
    //     background: 'unset',
    //     padding: 0,
    //     width: 32,
    //     height: 32,
    //     borderRadius: '50% 50% 50% 0',
    //     backgroundColor: '#52af77',
    //     transformOrigin: 'bottom left',
    //     transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    //     '&:before': { display: 'none' },
    //     '&.MuiSlider-valueLabelOpen': {
    //         transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    //     },
    //     '& > *': {
    //         transform: 'rotate(45deg)'
    //     }
    // }
}))

export default CustomSlider
