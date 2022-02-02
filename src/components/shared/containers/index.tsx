import Link from 'next/link'
import { styled } from '@mui/system'
import { colors } from 'src/utils/theme'

export const ListWrapper = styled('div')({
    padding: '20px 16px'
})

export const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
    width: '100%',

    '& [:active] [:focus]': {
        color: `${colors.pink}`,

        svg: {
            fill: `${colors.pink}`
        }
    },

    ['@media (hover: hover)']: {
        '&:hover': {
            color: `${colors.pink}`,

            svg: {
                fill: `${colors.pink}`
            }
        }
    }
})

export const ImageWrapper = styled('div')({
    height: `${({ height = 70 }) => `${height}px`}`,
    width: `${({ width = 70 }) => `${width}px`}`,
    marginRight: 15,

    img: {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover'
    }
})
