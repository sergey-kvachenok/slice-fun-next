import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Button from 'src/components/shared/Button'
import Verified from 'src/components/shared/Verified'
import { ImageWrapper } from 'src/utils/containers'

const Wrapper = styled('div')({
    '.contentContainer': {
        display: flex,
        justifyContent: 'space-between'
    }
})

const Info = ({ imageSrc, title, verified }) => {
    const { t } = useTranslation(['common'])

    return (
        <Wrapper>
            <div className="content-container">
                <ImageWrapper height={120} width={120}>
                    <img data-testid="podcast-image" height="120" width="120" src={imageSrc} alt="Podcast poster" />
                </ImageWrapper>

                <div>
                    <Verified verified={verified} />

                    <div className="primary-text">{title}</div>
                    <Button variant="outlined" title={t('follow')} customStyles={{ mr: 2, mb: 2 }} />
                    <Button variant="outlined" title={t('addPlaylist')} customStyles={{ mr: 2, mb: 2 }} />
                </div>
            </div>
        </Wrapper>
    )
}

export default Info
