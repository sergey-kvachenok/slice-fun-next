// libraries
import { MouseEventHandler, SyntheticEvent, useState } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import { makeStyles } from '@mui/styles'
// components
import Slider from 'src/components/shared/Slider'
import FifteenBack from 'src/assets/svg/fifteen-back.svg'
import FifteenForward from 'src/assets/svg/fifteen-forward.svg'
import PauseIcon from 'src/assets/svg/pause.svg'
import PlayIcon from 'src/assets/svg/play.svg'
import VolumeDownIcon from 'src/assets/svg/volume-down.svg'
import VolumeUpIcon from 'src/assets/svg/volume-up.svg'
// utils
import { colors } from 'src/utils/theme'

const useStyles = makeStyles({
    'player-wrapper': {
        maxWidth: 1440,
        width: '100%',
        height: 70,
        color: colors.white
    },

    'controls-wrapper': {
        padding: '6px 8px',
        display: 'flex',
        boxSizing: 'border-box',
        backgroundColor: '#000000'
    },

    'info-wrapper': {
        alignItems: 'center',
        marginRight: 12,
        fontSize: 12,
        display: 'flex',
        maxWidth: 266,
        width: '100%',

        '& .image-wrapper': {
            marginRight: 12,
            position: 'relative'
        },

        '& .description': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: 181
        }
    },

    controls: {
        width: '100%',
        maxWidth: 1158,
        alignItems: 'center',
        display: 'flex',

        '& .control-buttons-wrapper': {
            display: 'flex',
            alignItems: 'center'
        },

        '& .play-pause': {
            backgroundColor: colors.pink,
            borderRadius: '50%',
            display: 'flex',
            width: 48,
            height: 48,
            marginLeft: 16,
            marginRight: 16
        },

        '& .play-pause-icon': {
            margin: 'auto'
        }
    },

    'duration-wrapper': {
        display: 'flex',
        marginLeft: 35,
        alignItems: 'center',
        maxWidth: 786,
        width: '100%',

        '& .time': {
            fontFamily: 'monospace',
            fontSize: 14,
            marginRight: 20
        },

        '& .slider-wrapper': {
            maxWidth: 668,
            width: '100%'
        }
    },

    'volume-wrapper': {
        width: '100%',
        maxWidth: 118,
        display: 'flex',
        alignItems: 'center',
        marginLeft: 50,

        '& .volume-slider-wrapper': {
            maxWidth: 70,
            width: '100%',
            margin: '0 10px'
        }
    }
})

type PlayerControlsProps = {
    onPlayPause: MouseEventHandler<HTMLButtonElement>
    isPlaying: boolean
    onFastForward: Function
    onRewind: Function
    onMute: Function
    onVolumeChange: (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void
    onVolumeSeekDown: (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void
    onSeek: (event: Event, value: number | number[], activeThumb: number) => void
    onSeekMouseDown: MouseEventHandler<HTMLSpanElement>
    onSeekMouseUp: (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void
    volume: number
    played: number
    elapsedTime: string
    totalDuration: string
}

const PlayerControls = ({
    onPlayPause,
    isPlaying,
    onFastForward,
    onRewind,
    onMute,
    onVolumeChange,
    volume,
    onVolumeSeekDown,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    played,
    elapsedTime,
    totalDuration
}: PlayerControlsProps) => {
    const classes = useStyles()

    const playerIcon = isPlaying ? <PauseIcon className="play-pause-icon" /> : <PlayIcon className="play-pause-icon" />

    return (
        <div className={classes['player-wrapper']}>
            <div className={classes['controls-wrapper']}>
                <div className={classes['info-wrapper']}>
                    <div className="image-wrapper">
                        <Image
                            height={58}
                            width={58}
                            src="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/record-classix.jpeg"
                            alt="Poster"
                        />
                    </div>

                    <div>
                        <div>The mounth in the 90s (September version)</div>
                        <div className="description">Quickly Kevin, will he score; ddhfdhgfdhghdfsgl</div>
                    </div>
                </div>

                <div className={classes.controls}>
                    <div className="control-buttons-wrapper">
                        <FifteenBack onClick={onRewind} />

                        <button onClick={onPlayPause} className={classnames('play-pause', 'button-default')}>
                            {playerIcon}
                        </button>
                        <FifteenForward onClick={onFastForward} />
                    </div>

                    <div className={classes['duration-wrapper']}>
                        <div className="time">
                            {elapsedTime}/{totalDuration}
                        </div>
                        <div className="slider-wrapper">
                            <Slider
                                min={0}
                                max={100}
                                value={played * 100}
                                onChange={onSeek}
                                onMouseDown={onSeekMouseDown}
                                onChangeCommitted={onSeekMouseUp}
                                trackColor={colors.white}
                                sliderColor={colors.grey}
                            />
                        </div>
                    </div>

                    <div className={classes['volume-wrapper']}>
                        <VolumeDownIcon
                            onClick={() => {
                                onMute(true)
                            }}
                        />
                        <div className="volume-slider-wrapper">
                            <Slider
                                min={0}
                                max={100}
                                value={volume * 100}
                                onChange={onVolumeChange}
                                onChangeCommitted={onVolumeSeekDown}
                                trackColor={colors.grey}
                                sliderColor={colors.white}
                            />
                        </div>
                        <VolumeUpIcon
                            onClick={() => {
                                onMute(false)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerControls
