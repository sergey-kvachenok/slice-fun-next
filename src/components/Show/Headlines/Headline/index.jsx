import { styled } from '@mui/system'
import ShareIcon from '@mui/icons-material/Share'
import { colors } from 'src/utils/theme'

const Wrapper = styled('div')({
    display: 'flex',
    border: `2px dashed ${colors.coralRed}`,
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    position: 'relative',

    '.poster': {
        height: 70,
        width: 70,
        marginRight: 15,

        img: {
            height: 'inherit'
        }
    },

    '.title': {
        width: '60%'
    },

    '.banner': {
        backgroundColor: `${colors.coralRed}`,
        borderRadius: 4,
        boxShadow: `3px 3px 5px ${colors.opacityGray}`,
        color: `${colors.white}`,
        padding: 7,
        position: 'absolute',
        right: 15,
        top: -2
    }
})

const Headline = ({ headline }) => {
    const { image, title, description } = headline || {}

    const handleShareClick = () => {
        console.log('Shared')
    }

    return (
        <Wrapper>
            <div className="poster">
                <img data-testid="poster-image" width="70" height="70" src={image} alt="Headline" />
            </div>

            <div className="info">
                <div className="title primary-text">{title}</div>
                <div className="description secondary-text">{description}</div>
            </div>

            <ShareIcon
                data-testid="share-icon"
                onClick={handleShareClick}
                type="button"
                fontSize="medium"
                sx={{ ml: 2, cursor: 'pointer' }}
            />

            <div data-testid="banner" className="banner">
                Banner text
            </div>
        </Wrapper>
    )
}

export default Headline
