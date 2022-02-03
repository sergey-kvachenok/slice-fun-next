// libraries
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/system'
// components
import CustomTabs from 'src/components/shared/Tabs'
import Episode from 'src/components/Show/Episodes/Episode'
import VideoEpisode from 'src/components/Show/Episodes/VideoEpisode'
import Button from 'src/components/shared/Button'
import { ListWrapper } from 'src/components/shared/containers'
// constants
import { ILatestShow, IVideo } from 'src/constants/interfaces'

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

const getTabs = (t: Function) => [
    {
        label: t('tabs:firstTab'),
        clickHandler: () => {
            console.log('First Tab')
        }
    },
    {
        label: t('tabs:secondTab'),
        clickHandler: () => {
            console.log('Second Tab')
        }
    },
    {
        label: t('tabs:live'),
        clickHandler: () => {
            console.log('Live')
        }
    },
    {
        label: t('tabs:fourthTab'),
        clickHandler: () => {
            console.log('Fourth Tab')
        }
    },
    {
        label: t('tabs:fifthTab'),
        clickHandler: () => {
            console.log('Fifth Tab')
        }
    }
]

type EpisodesProps = {
    latestEpisodes: ILatestShow[]
    premiumEpisodes: ILatestShow[]
    video: IVideo[]
}

const Episodes = ({ latestEpisodes = [], premiumEpisodes = [], video = [] }: EpisodesProps) => {
    const { t } = useTranslation(['episodes', 'common', 'tabs'])

    const handleLoadMoreClick = () => {
        console.log('Load more')
    }

    return (
        <div className="container-padding">
            <CustomTabs tabs={getTabs(t)} />

            <ListWrapper>
                <div className="primary-text">{t('latestEpisodes')}</div>
                {latestEpisodes?.map((episode) => (
                    <Episode dataTestId="latest-episode" key={episode.id} episode={episode} />
                ))}
                <ButtonContainer>
                    <Button variant="outlined" title={t('common:loadMore')} onClick={handleLoadMoreClick} />
                </ButtonContainer>
            </ListWrapper>

            <ListWrapper>
                <div className="primary-text">{t('premiumEpisodes')}</div>
                {premiumEpisodes?.map((episode) => (
                    <Episode key={episode.id} episode={episode} />
                ))}
                <ButtonContainer>
                    <Button variant="outlined" title={t('common:loadMore')} onClick={handleLoadMoreClick} />
                </ButtonContainer>
            </ListWrapper>

            <ListWrapper>
                <div className="primary-text">{t('latestVideo')}</div>
                {video?.map((episode) => (
                    <VideoEpisode key={episode.id} episode={episode} />
                ))}
            </ListWrapper>
        </div>
    )
}

export default Episodes
