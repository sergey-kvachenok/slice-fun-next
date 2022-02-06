// libraries
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system'
import Slider from '@mui/material/Slider'
// utils
import { colors } from 'src/utils/theme'

type ProgressBarProps = {
    beforeWidth: number
}

export const styles = {
    root: {
        color: `${colors.white}`,
        bottom: 0,
        boxSizing: 'border-box',
        padding: '5px 20px',
        position: 'fixed',
        maxWidth: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        boxSizing: 'border-box'
    },

    'audio-info': {
        background: `${colors.opacityGray}`,
        borderRadius: 15,
        padding: '0 5px',
        display: 'flex',
        alignItems: 'center',
        marginRight: 20,
        overflow: 'hidden'
    },

    text: {
        fontSize: 12,
        margin: 0
    },

    title: {
        fontWeight: 'bold'
    },

    'audio-player-wrapper': {
        alignItems: 'center',
        background: `${colors.opacityGray}`,
        display: 'flex',
        maxHeight: 40,
        borderRadius: 15,
        padding: '0 5px'
    },

    forwardBackward: {
        background: 'none',
        color: `${colors.white}`,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: 16,
        cursor: 'pointer',

        '[@media (hover: hover)]': {
            '&:hover': {
                color: `${colors.pink}`
            }
        },

        '&:active': {
            color: `${colors.pink}`
        }
    },

    playPause: {
        background: `${colors.pink}`,
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: 55,
        height: 55,
        fontSize: 26,
        color: `${colors.yellow}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        svg: {
            fill: `${colors.white}`
        }
    },

    '[currentTime] [duration]': {
        fontFamily: 'monospace',
        fontSize: 12
    },

    currentTime: {
        marginLeft: 20,
        marginRight: 5
    },

    duration: {
        marginLeft: 5
    },

    'progress-bar': {
        appearance: 'none',
        background: colors.lightPeach,
        borderRadius: 10,
        position: 'relative',
        height: 11,
        outline: 'none',
        marginRight: 6,
        marginLeft: 6,

        '&::before': {
            content: "''",
            height: 11,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            width: `${() => {
                console.log('props', props)
                return `${props.beforeWidth}%` || 0
            }}`,
            backgroundColor: `${colors.opacityGray}`,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            cursor: 'pointer'
        }
    }
}

// export const ProgressBar = styled(Slider)((props) => ({
//     height: 11,
//     background: `${colors.lightPeach}`,
//     padding: 0,
//     width: props.beforeWidth
// }))

// ({
//     appearance: 'none',
//     background: `${colors.lightPeach}`,
//     borderRadius: 10,
//     position: 'relative',
//     height: 11,
//     outline: 'none',
//     marginRight: 6,
//     marginLeft: 6,

//     '&::before': {
//         content: "''",
//         height: 11,
//         borderTopLeftRadius: 5,
//         borderBottomLeftRadius: 5,
//         width: `${(props) => `${props.beforeWidth}%` || 0}`,
//         backgroundColor: `${colors.opacityGray}`,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         zIndex: 2,
//         cursor: 'pointer'
//     },

//     '&::-webkit-slider-thumb': {
//         ' -webkit-appearance': 'none',
//         height: 15,
//         width: 15,
//         borderRadius: '50%',
//         border: 'none',
//         backgroundColor: `${() => colors.pink}`,
//         cursor: 'pointer',
//         position: 'relative',
//         zIndex: 3,
//         boxSizing: 'border-box'
//     },

//     '&:active::-webkit-slider-thumb': {
//         transform: 'scale(1.2)',
//         background: `${() => colors.pink}`
//     }
// })
