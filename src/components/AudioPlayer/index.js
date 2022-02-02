import React, { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import { setCurrentTime, setIsPlaying, setDuration } from '../../store/slices/playerSlice'
import { AudioPlayerWrapper, ProgressBar, AudioInfo, Wrapper } from './AudioPlayer.styles'
import { ImageWrapper } from '../../styles/containers'

export const shiftTime = 15

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
}

const getProgressBarBeforeWidth = (currentProgress, duration) => {
    if (!currentProgress || !duration) return 0
    const beforeWidth = (currentProgress / duration) * 100
    return beforeWidth
}

const AudioPlayer = () => {
    const dispatch = useDispatch()
    const { isPlaying, id, title, imageSrc, audioSrc, duration, currentTime } = useSelector(({ player }) => player)

    // references
    const audioPlayer = useRef() // reference our audio component
    const progressBar = useRef() // reference our progress bar
    const animationRef = useRef() // reference the animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current?.duration)
        dispatch(setDuration(seconds))
        progressBar.current.max = seconds
    }, [dispatch, audioPlayer.current?.duration])

    const changePlayerCurrentTime = useCallback(() => {
        dispatch(setCurrentTime(Number(progressBar.current?.value)))
    }, [dispatch])

    const whilePlaying = useCallback(() => {
        progressBar.current.value = audioPlayer.current?.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }, [changePlayerCurrentTime])

    const handlePlayPause = useCallback(() => {
        if (isPlaying) {
            audioPlayer.current?.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current?.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }, [whilePlaying, isPlaying, id]) // id for changing episodes

    useEffect(() => {
        handlePlayPause()
    }, [handlePlayPause])

    const togglePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying))
        handlePlayPause(isPlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current?.value
        changePlayerCurrentTime()
    }

    const backTimeshift = () => {
        progressBar.current.value = Number(progressBar.current?.value) - shiftTime
        changeRange()
    }

    const forwardTimeshift = () => {
        progressBar.current.value = Number(progressBar.current?.value) + shiftTime
        changeRange()
    }

    const audioDuration = duration && !isNaN(duration) && calculateTime(duration)

    const handleEndEvent = () => {
        togglePlayPause()
        progressBar.current.value = 0
    }

    return (
        <Wrapper>
            <AudioInfo>
                <ImageWrapper height={50} width={50}>
                    <img
                        data-testid="player-image"
                        src={imageSrc}
                        height="50"
                        width="50"
                        alt="Current audio track poster"
                    />
                </ImageWrapper>
                <div>
                    <p className="title text">{title}</p>
                    <p className="text">Duration: {audioDuration ? audioDuration : '00:00'}</p>
                </div>
            </AudioInfo>

            <AudioPlayerWrapper>
                <audio
                    data-testid="player"
                    ref={audioPlayer}
                    onEnded={handleEndEvent}
                    src={audioSrc}
                    preload="metadata"
                ></audio>

                <button data-testid="shift-back-button" className="forwardBackward" onClick={backTimeshift}>
                    <ArrowBackOutlinedIcon fontSize="small" /> {shiftTime}
                </button>

                {/* play/pause */}
                <button data-testid="play-pause-button" onClick={togglePlayPause} className="playPause">
                    {isPlaying ? <PauseRoundedIcon fontSize="large" /> : <PlayArrowRoundedIcon fontSize="large" />}
                </button>

                <button data-testid="shift-forward-button" className="forwardBackward" onClick={forwardTimeshift}>
                    {shiftTime} <ArrowForwardOutlinedIcon fontSize="small" />
                </button>

                {/* current time */}
                <div data-testid="current-time" className="currentTime xs-hidden">
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <ProgressBar
                    data-testid="progress-bar"
                    className="xs-hidden"
                    beforeWidth={getProgressBarBeforeWidth(progressBar.current?.value, duration)}
                    ref={progressBar}
                    onChange={changeRange}
                />

                {/* duration */}
                <div className="duration xs-large-hidden">{audioDuration ? audioDuration : '00:00'}</div>
            </AudioPlayerWrapper>
        </Wrapper>
    )
}

export default AudioPlayer
