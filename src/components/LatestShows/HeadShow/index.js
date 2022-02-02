import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined'
import Button from '../../shared/Button'
import Verified from '../../shared/Verified'
import HeaderBackground from '../../shared/HeaderBackground'
import { ImageWrapper } from '../../../styles/containers'
import { setPlayerInfo, setIsPlaying } from '../../../store/slices/playerSlice'

const Wrapper = styled.div`
    height: 250px;
    position: relative;
    background-position: center;
    background-size: auto;

    .content-container {
        display: flex;
        justify-content: 'space-between';
        position: absolute;
        bottom: 30px;
        left: 20px;
    }

    .header {
        display: flex;
        align-items: center;
    }
`

const HeadShow = ({ showData }) => {
    const { t } = useTranslation(['latestShows'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isPlaying, id } = useSelector(({ player }) => player)

    const { id: showId, verified, title, image, mainImage, source } = showData || {}

    const redirectToShow = () => {
        navigate(`/shows/${showId}`)
    }

    const togglePlayPause = () => {
        const params = {
            id: showId,
            isPlaying: !isPlaying,
            audioSrc: source,
            imageSrc: image,
            title
        }

        if (!id || id !== showId) {
            dispatch(setPlayerInfo(params))
        }

        if (id && id === showId) {
            dispatch(setIsPlaying(!isPlaying))
        }
    }

    return (
        <Wrapper>
            <HeaderBackground backgroundImageSrc={mainImage} />
            <div className="info">
                <div className="content-container">
                    <ImageWrapper height={120} width={120}>
                        <img data-testid="head-show-image" height="120" width="120" src={image} alt="Podcast poster" />
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
