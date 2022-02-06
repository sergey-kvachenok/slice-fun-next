// libraries
import { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import Image from 'next/image'
import Slider from '@mui/material/Slider'
import SliderUnstyled from '@mui/base/SliderUnstyled'
import { makeStyles } from '@mui/styles'
import classnames from 'classnames'
// components
import { ImageWrapper } from 'src/components/shared/containers'
// store
import { setCurrentTime, setIsPlaying, setDuration } from 'store/slices/playerSlice'
import { RootState } from 'store'
// styles
import { styles } from './AudioPlayer.styles'
import { colors } from 'src/utils/theme'
import { red } from '@mui/material/colors'

const useStyles = makeStyles({
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
        '.MuiSlider-root': {
            // appearance: 'none',
            background: colors.coralRed,
            // borderRadius: 10,
            // position: 'relative',
            width: 40,
            // outline: 'none',
            marginRight: 6,
            marginLeft: 6,

            '.MuiSlider-root': {
                backgroundColor: red
            },

            '.MuiSlider-thumb': {
                color: red
            }
        }
    }

    //     '&::before': {
    //         content: "''",
    //         height: 11,
    //         borderTopLeftRadius: 5,
    //         borderBottomLeftRadius: 5,
    //         width: 40,
    //         // width: (props) => {
    //         //     console.log('props', props)
    //         //     return `${props.beforeWidth}%` || 0
    //         // },
    //         backgroundColor: `${colors.pink}`,
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         zIndex: 2,
    //         cursor: 'pointer'
    //     },
    //     ['&::-webkit-slider-thumb']: {
    //         '-webkit-appearance': 'none',
    //         height: 15,
    //         width: 15,
    //         borderRadius: '50%',
    //         border: 'none',
    //         backgroundColor: `${() => colors.pink}`,
    //         cursor: 'pointer',
    //         position: 'relative',
    //         zIndex: 3,
    //         boxSizing: 'border-box'
    //     }
    // },

    // '&:active::-webkit-slider-thumb': {
    //     transform: 'scale(1.2)',
    //     background: `${() => colors.pink}`
    // }
})

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

    const styleProps = {
        beforeWidth: getProgressBarBeforeWidth(Number(progressBar.current?.value), duration as number)
    }
    const classes = useStyles(styleProps)

    useEffect(() => {
        if (audioPlayer.current && !isPlaying && currentTime) {
            audioPlayer.current.currentTime = Number(currentTime)
        }
    }, [isPlaying, currentTime])

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
        <div className={classes.root}>
            <div className={classes['audio-info']}>
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
                    <p className={classnames(classes.title, classes.text)}>{title}</p>
                    <p className={classes.text}>Duration: {audioDuration ? audioDuration : '00:00'}</p>
                </div>
            </div>

            <div className={classes['audio-player-wrapper']}>
                <audio
                    data-testid="player"
                    ref={audioPlayer}
                    onEnded={handleEndEvent}
                    src={audioSrc}
                    preload="metadata"
                ></audio>

                <button data-testid="shift-back-button" className={classes.forwardBackward} onClick={backTimeshift}>
                    <ArrowBackOutlinedIcon fontSize="small" /> {shiftTime}
                </button>

                {/* play/pause */}
                <button data-testid="play-pause-button" onClick={togglePlayPause} className={classes.playPause}>
                    {isPlaying ? <PauseRoundedIcon fontSize="large" /> : <PlayArrowRoundedIcon fontSize="large" />}
                </button>

                <button
                    data-testid="shift-forward-button"
                    className={classes.forwardBackward}
                    onClick={forwardTimeshift}
                >
                    {shiftTime} <ArrowForwardOutlinedIcon fontSize="small" />
                </button>

                {/* current time */}
                <div data-testid="current-time" className={classnames(classes.currentTime, 'xs-hidden')}>
                    {calculateTime(currentTime as number)}
                </div>

                {/* progress bar */}
                <Slider className={classes['progress-bar']} aria-label="Volume" defaultValue={30} value={0} />
                {/* <input
                    type="range"
                    defaultValue="0"
                    data-testid="progress-bar"
                    ref={progressBar}
                    onChange={changeRange}
                    className={classnames(classes['progress-bar'], 'xs-hidden')}
                /> */}

                <Slider aria-label="Volume" defaultValue={30} value={0} onChange={changeRange} />

                {/* <Slider
                    ref={progressBar}
                    className={classes.slider}
                    defaultValue={0}
                    aria-label="Duration"
                    value={40}
                    onChange={changeRange}
                    size="medium"
                /> */}
                {/* <ProgressBar
                    data-testid="progress-bar"
                    className="xs-hidden"
                    beforeWidth={getProgressBarBeforeWidth(Number(progressBar.current?.value), duration as number)}
                    ref={progressBar}
                    onChange={changeRange}
                /> */}

                {/* duration */}
                <div className={classnames(classes.duration, 'xs-large-hidden')}>
                    {audioDuration ? audioDuration : '00:00'}
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer
