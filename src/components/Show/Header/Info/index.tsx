// libraries
import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
// components
import Button from 'src/components/shared/Button'
import Verified from 'src/components/shared/Verified'
import { ImageWrapper } from 'src/components/shared/containers'

const Wrapper = styled('div')({
    '.content-container': {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

type InfoProps = {
    imageSrc: string
    title: string
    verified: boolean
}

const Info = ({ imageSrc, title, verified }: InfoProps) => {
    const { t } = useTranslation(['common'])

    const handleButtonClick = () => {
        console.log('Button click')
    }

    return (
        <Wrapper>
            <div className="content-container">
                <ImageWrapper height={120} width={120}>
                    <Image data-testid="podcast-image" height="120" width="120" src={imageSrc} alt="Podcast poster" />
                </ImageWrapper>

                <div>
                    <Verified verified={verified} />

                    <div className="primary-text">{title}</div>
                    <Button
                        variant="outlined"
                        title={t('follow')}
                        customStyles={{ mr: 2, mb: 2 }}
                        onClick={handleButtonClick}
                    />
                    <Button
                        variant="outlined"
                        title={t('addPlaylist')}
                        customStyles={{ mr: 2, mb: 2 }}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </Wrapper>
    )
}

export default Info
