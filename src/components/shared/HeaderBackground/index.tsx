// libraries
import Image from 'next/image'
import { styled } from '@mui/system'
// assets
import DefaultImage from 'src/assets/images/defaultHeader.png'

const StyledImage = styled(Image)({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    objectFit: 'cover',
    width: '100%',
    filter: 'blur(2px)'
})

type HeaderBackgroundProps = {
    backgroundImageSrc: string
}

const HeaderBackground = ({ backgroundImageSrc }: HeaderBackgroundProps) => {
    return (
        <StyledImage
            layout="fill"
            data-testid="background-image"
            src={backgroundImageSrc || DefaultImage}
            alt="Show background"
        />
    )
}

export default HeaderBackground
