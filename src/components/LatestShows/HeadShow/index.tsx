// libraries
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined'
import Image from 'next/image'
// components
import Button from 'src/components/shared/Button'
import Verified from 'src/components/shared/Verified'
import HeaderBackground from 'src/components/shared/HeaderBackground'
import { ImageWrapper } from 'src/components/shared/containers'
// constants
import { IPopularShow } from 'src/constants/interfaces'
// store
import { setPlayerInfo, setIsPlaying } from 'store/slices/playerSlice'
import { RootState } from 'store'

const Wrapper = styled('div')({
    height: 250,
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'auto',

    '.content-container': {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 30,
        left: 20
    },

    '.header': {
        display: 'flex',
        alignItems: 'center'
    }
})

type HeadShowProps = {
    showData: IPopularShow
}

const HeadShow = ({ showData }: HeadShowProps) => {
    const { t } = useTranslation(['latestShows'])
    const dispatch = useDispatch()
    const router = useRouter()
    const { isPlaying, id } = useSelector(({ player }: RootState) => player)

    const { id: showId, verified, title, image, mainImage, source } = showData || {}

    const redirectToShow = () => {
        router.push(`/shows/${showId}`)
    }

    const togglePlayPause = () => {
        const params = {
            id: showId,
            isPlaying: !isPlaying,
            audioSrc: source,
            imageSrc: image,
            title
        }

        if (!id) {
            dispatch(setPlayerInfo(params))
        }

        if (id) {
            dispatch(setIsPlaying(!isPlaying))
        }
    }

    return (
        <Wrapper>
            <HeaderBackground backgroundImageSrc={mainImage} />
            <div className="info">
                <div className="content-container">
                    <ImageWrapper height={120} width={120}>
                        <Image
                            data-testid="head-show-image"
                            height="120"
                            width="120"
                            src={image}
                            alt="Podcast poster"
                        />
                    </ImageWrapper>

                    <div>
                        <Verified verified={verified} />

                        <div data-testid="head-show-title" className="primary-text">
                            {title}
                        </div>

                        <div className="header">
                            {isPlaying ? (
                                <PauseCircleOutlineOutlinedIcon
                                    data-testid="head-show-pause-icon"
                                    fontSize="large"
                                    className="pointer play-pause-button"
                                    onClick={togglePlayPause}
                                />
                            ) : (
                                <PlayCircleOutlinedIcon
                                    data-testid="head-show-play-icon"
                                    fontSize="large"
                                    className="pointer play-pause-button"
                                    onClick={togglePlayPause}
                                />
                            )}

                            <Button
                                dataTestId="head-show-go-to-show-button"
                                variant="outlined"
                                title={t('headShowButton')}
                                customStyles={{ ml: 2 }}
                                onClick={redirectToShow}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default HeadShow
