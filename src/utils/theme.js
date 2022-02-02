import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const convertColorToMUI = (colors = []) => {
    const keys = Object.keys(colors) || []

    return keys.reduce((acc, key) => {
        return { ...acc, [key]: { main: colors[key] } }
    }, {})
}

export const colors = {
    pink: '#ff405b',
    yellow: '#ffd200',
    lightPeach: '#ffe3d4',
    coralRed: '#f7484b',
    blue: '#a9eeed',
    darkBlue: '#3452a5',
    darkBlue1: '#000106',
    oceanGreen: '#26c9c3',
    opacityGray: '#2c2c39de',
    white: '#fff'
}

export const breakpoints = {
    xs: '450px',
    xsMax: '767px',
    sm: '768px',
    smMax: '1023px',
    md: '1024px',
    mdMax: '1199px',
    lg: '1200px'
}

export const zIndexes = {
    search: 1,
    offlineBanner: 2
}

// Create a theme instance.
const theme = createTheme({
    palette: {
        ...convertColorToMUI(colors),
        primary: {
            main: '#556cd6'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    }
})

export default theme
