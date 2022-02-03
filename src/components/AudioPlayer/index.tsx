// libraries
import { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import Image from 'next/image'
// components
import { ImageWrapper } from 'src/components/shared/containers'
// store
import { setCurrentTime, setIsPlaying, setDuration } from 'store/slices/playerSlice'
import { RootState } from 'store'
// styles
import { AudioPlayerWrapper, ProgressBar, AudioInfo, Wrapper } from './AudioPlayer.styles'

export const shiftTime = 15

const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
}

const getProgressBarBeforeWidth = (currentProgress: number, duration: number) => {
    if (!currentProgress || !duration) return 0
    const beforeWidth = (currentProgress / duration) * 100
    return beforeWidth
}

const AudioPlayer = () => {
    const dispatch = useDispatch()
    const {
        isPlaying,
        id,
        title,
        imageSrc = '',
        audioSrc,
        duration,
        currentTime
    } = useSelector(({ player }: RootState) => player)

    // references
    const audioPlayer = useRef<HTMLAudioElement>(null) // reference our audio component
    const progressBar = useRef<HTMLInputElement>(null) // reference our progress bar
    const animationRef = useRef<number>() // reference the animation: ;

    useEffect(() => {
        if (!audioPlayer.current || !progressBar.current) return

        const seconds = Math.floor(audioPlayer.current?.duration as number)
        dispatch(setDuration(seconds))
        progressBar.current.max = seconds.toString()
    }, [dispatch, audioPlayer.current?.duration])

    const changePlayerCurrentTime = useCallback(() => {
        dispatch(setCurrentTime(Number(progressBar.current?.value)))
    }, [dispatch])

    const whilePlaying = useCallback(() => {
        if (!audioPlayer.current || !progressBar.current) return

        const currentTime = audioPlayer.current?.currentTime

        progressBar.current.value = currentTime?.toString()
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }, [changePlayerCurrentTime])

    const handlePlayPause = useCallback(() => {
        if (!id) return

        if (isPlaying) {
            audioPlayer.current?.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current?.pause()
            animationRef.current && cancelAnimationFrame(animationRef.current)
        }
    }, [whilePlaying, isPlaying, id]) // id for changing episodes

    useEffect(() => {
        handlePlayPause()
    }, [handlePlayPause])

    const togglePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying))
        handlePlayPause()
    }

    const changeRange = () => {
        if (!audioPlayer.current) return

        audioPlayer.current.currentTime = Number(progressBar.current?.value)
        changePlayerCurrentTime()
    }

    const backTimeshift = () => {
        if (progressBar.current) {
            progressBar.current.value = (Number(progressBar.current?.value) - shiftTime).toString()
        }
        changeRange()
    }

    const forwardTimeshift = () => {
        if (progressBar.current) {
            progressBar.current.value = (Number(progressBar.current?.value) + shiftTime).toString()
        }
        changeRange()
    }

    const audioDuration = duration && !isNaN(duration as number) && calculateTime(duration as number)

    const handleEndEvent = () => {
        togglePlayPause()

        if (progressBar.current) {
            progressBar.current.value = '0'
        }
    }

    return (
        <Wrapper>
            <AudioInfo>
                <ImageWrapper height={50} width={50}>
                    <Image
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
                    {calculateTime(currentTime as number)}
                </div>

                {/* progress bar */}
                <ProgressBar
                    data-testid="progress-bar"
                    className="xs-hidden"
                    beforeWidth={getProgressBarBeforeWidth(Number(progressBar.current?.value), duration as number)}
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
