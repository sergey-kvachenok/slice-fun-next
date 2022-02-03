//libraries
import { useState } from 'react'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined'
// components
import Button from 'src/components/shared/Button'
// constants
import { ILatestShow } from 'src/constants/interfaces'
// store
import { RootState } from 'store'
import { setPlayerInfo, setIsPlaying } from 'store/slices/playerSlice'

const Wrapper = styled('div')({
    alignItems: 'baseline',
    display: 'flex',
    marginBottom: 10,

    '.date': {
        marginRight: 15
    },

    '.info': {
        width: '80%'
    },

    '.header': {
        display: 'flex',
        alignitems: 'center',
        marginBottom: 6
    },

    '.play-pause-button': {
        marginRight: 8
    },

    '.collapsed-description': {
        transition: 'max-height 0.5s ease-in-out',
        maxHeight: 0,
        overflow: 'hidden'
    },

    '.expanded-description': {
        transition: 'max-height 0.5s ease-in-out',
        overflow: 'auto',
        maxHeight: 200
    }
})

type EpisodeProps = {
    episode: ILatestShow
    dataTestId?: string
}

const Episode = ({ episode, dataTestId }: EpisodeProps) => {
    const { t } = useTranslation(['common'])
    const dispatch = useDispatch()
    const { isPlaying, id } = useSelector(({ player }: RootState) => player)

    const [currentEpisodeId, setCurrentEpisodeId] = useState<string | null>(null)
    const [isExpanded, setExpanded] = useState(false)

    const { id: episodeId, date, title, description, extendedDescription, source, image } = episode || {}

    const isCurrentEpisode = id === currentEpisodeId

    const handleExpandClick = () => {
        setExpanded((prevValue) => !prevValue)
    }

    const toglePlayPause = (id: string) => {
        const params = {
            id: episodeId,
            isPlaying: !isPlaying,
            audioSrc: source,
            imageSrc: image,
            title
        }

        setCurrentEpisodeId(id)
        if (!isPlaying) {
            dispatch(setPlayerInfo(params))
            return
        }

        if (isPlaying && isCurrentEpisode) {
            dispatch(setIsPlaying(!isPlaying))
            return
        }

        if (isPlaying && !isCurrentEpisode) {
            const currentParams = { ...params, isPlaying: true }
            dispatch(setPlayerInfo(currentParams))
        }
    }

    const descriptionClass = isExpanded ? 'expanded-description' : 'collapsed-description'

    return (
        <Wrapper data-testid={dataTestId}>
            <div className="date secondary-text">{dayjs(new Date(date)).format('MMM D, YYYY')}</div>

            <div className="info">
                <div className="header">
                    {isCurrentEpisode && isPlaying ? (
                        <PauseCircleOutlineOutlinedIcon
                            className="pointer play-pause-button"
                            onClick={() => toglePlayPause(episodeId)}
                        />
                    ) : (
                        <PlayCircleOutlinedIcon
                            className="pointer play-pause-button"
                            onClick={() => toglePlayPause(episodeId)}
                        />
                    )}
                    <div className="primary-text">{title}</div>
                </div>

                <div className="description secondary-text">{description}</div>

                <div className={`description secondary-text ${descriptionClass}`}>{extendedDescription}</div>

                <Button
                    dataTestId="expand-more"
                    title={t('expandMore')}
                    onClick={handleExpandClick}
                    customStyles={{ mt: 1 }}
                />
            </div>
        </Wrapper>
    )
}

export default Episode
