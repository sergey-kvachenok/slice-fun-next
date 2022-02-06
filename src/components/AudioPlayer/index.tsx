import ReactPlayer from 'react-player'
import Image from 'next/image'
import classnames from 'classnames'
import { makeStyles } from '@mui/styles'
import FifteenBack from 'src/assets/svg/fifteen-back.svg'
import FifteenForward from 'src/assets/svg/fifteen-forward.svg'
import PauseIcon from 'src/assets/svg/pause.svg'
import VolumeDownIcon from 'src/assets/svg/volume-down.svg'
import VolumeUpIcon from 'src/assets/svg/volume-up.svg'
import { colors } from 'src/utils/theme'
import Slider from 'src/components/shared/Slider'

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

const AudioPlayer = () => {
    const classes = useStyles()

    return (
        <div className={classes['player-wrapper']}>
            <ReactPlayer
                url="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/clssx_-_rc_2021-07-09.mp3"
                muted={true}
                playing={true}
                height={0}
                width={0}
            />

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
                        <div>The mounth in the 90's (September version)</div>
                        <div className="description">Quickly Kevin, will he score; ddhfdhgfdhghdfsgl</div>
                    </div>
                </div>

                <div className={classes.controls}>
                    <div className="control-buttons-wrapper">
                        <FifteenBack />

                        <button className={classnames('play-pause', 'button-default')}>
                            <PauseIcon className="play-pause-icon" />
                        </button>
                        <FifteenForward />
                    </div>

                    <div className={classes['duration-wrapper']}>
                        <div className="time">31:21/01:09:14</div>
                        <div className="slider-wrapper">
                            <Slider trackColor={colors.white} sliderColor={colors.grey} />
                        </div>
                    </div>

                    <div className={classes['volume-wrapper']}>
                        <VolumeDownIcon />
                        <div className="volume-slider-wrapper">
                            <Slider trackColor={colors.grey} sliderColor={colors.white} />
                        </div>
                        <VolumeUpIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer
