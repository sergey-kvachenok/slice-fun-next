// libraries
import Image from 'next/image'
import { styled } from '@mui/system'
import dayjs from 'dayjs'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
// constants
import { IVideo } from 'src/constants/interfaces'

// utils
import { colors } from 'src/utils/theme'

const Wrapper = styled('div')({
    alignItems: 'baseline',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,

    '.poster': {
        height: 70,
        width: 70,
        marginRight: 15,

        img: {
            height: 'inherit'
        }
    },

    '.header': {
        display: 'flex',
        alignItems: 'center'
    },

    '.banner': {
        color: `${colors.white}`,
        backgroundColor: `${colors.opacityGray}`,
        boxShadow: `3px 3px 5px ${colors.opacityGray}`,
        padding: 7,
        borderRadius: 4,
        marginLeft: 15
    }
})

type VideoEpisodeProps = {
    episode: IVideo
}

const VideoEpisode = ({ episode }: VideoEpisodeProps) => {
    const { date, title, description, image } = episode || {}

    const hadlePlayClick = () => {
        console.log('Play clicked')
    }

    return (
        <Wrapper>
            <div className="poster">
                <Image width="70" height="70" src={image} alt="Headline" />
            </div>

            <div>
                <div className="secondary-text">{dayjs(new Date(date)).format('MMM D, YYYY')}</div>
                <div className="header">
                    <PlayCircleOutlinedIcon className="pointer" onClick={hadlePlayClick} />

                    <div className="primary-text">{title}</div>
                    <div className="banner secondary-text">Some text</div>
                </div>
                <div className="description secondary-text">{description}</div>
            </div>
        </Wrapper>
    )
}

export default VideoEpisode
