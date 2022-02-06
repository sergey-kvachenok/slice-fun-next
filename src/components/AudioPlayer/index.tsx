// libraries
import ReactPlayer from 'react-player'
import { useState, useRef } from 'react'
// components
import PlayerControls from 'src/components/AudioPlayer/PlayerControls'

const defaultTime = 15

const format = (seconds: number) => {
    if (isNaN(seconds)) {
        return `00:00`
    }
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
}

const AudioPlayer = () => {
    const playerRef = useRef(null)
    const [state, setState] = useState({
        playing: false,
        muted: false,
        volume: 0.5,
        played: 0,
        seeking: false
    })

    const { playing, muted, volume, played, seeking } = state

    const handlePlayPause = () => {
        setState({ ...state, playing: !playing })
    }

    const handleMute = (value: boolean) => {
        setState({ ...state, muted: value, volume: value ? 0 : 1 })
    }

    const handleRewind = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - defaultTime)
        }
    }

    const handleFastForward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + defaultTime)
        }
    }

    const handleVolumeChange = (event: MouseEvent, newValue: number) => {
        setState({ ...state, volume: parseFloat(newValue / 100), muted: newValue === 0 ? true : false })
    }

    const handleVolumeSeekDown = (event: MouseEvent, newValue: number) => {
        setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) })
    }

    const handleProgress = (changeState) => {
        if (!seeking) {
            setState({ ...state, ...changeState })
        }
    }

    const handleSeekChange = (event: MouseEvent, newValue: number) => {
        setState({ ...state, played: parseFloat(newValue / 100) })
    }

    const handleSeekMouseDown = (event: MouseEvent) => {
        setState({ ...state, seeking: true })
    }

    const handleSeekMouseUp = (event: MouseEvent, newValue: number) => {
        setState({ ...state, seeking: false })

        if (playerRef.current) {
            playerRef.current.seekTo(newValue / 100, 'fraction')
        }
    }

    const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : '00:00'

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00:00'

    const elapsedTime = format(currentTime)
    const totalDuration = format(duration)

    return (
        <>
            <ReactPlayer
                ref={playerRef}
                url="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/clssx_-_rc_2021-07-09.mp3"
                onProgress={handleProgress}
                muted={muted}
                playing={playing}
                volume={volume}
                height={0}
                width={0}
            />

            <PlayerControls
                onSeek={handleSeekChange}
                onSeekMouseDown={handleSeekMouseDown}
                onSeekMouseUp={handleSeekMouseUp}
                isPlaying={playing}
                onPlayPause={handlePlayPause}
                onRewind={handleRewind}
                onFastForward={handleFastForward}
                onMute={handleMute}
                onVolumeChange={handleVolumeChange}
                onVolumeSeekDown={handleVolumeSeekDown}
                volume={volume}
                played={played}
                elapsedTime={elapsedTime}
                totalDuration={totalDuration}
            />
        </>
    )
}

export default AudioPlayer
