import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Button from '../../shared/Button'
import Search from '../../shared/Search'
import HeaderBackground from '../../shared/HeaderBackground'
import Info from './Info'
import { breakpoints } from 'src/utils/theme'

const Wrapper = styled('div')({
    height: 250,
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'auto',

    '.content-container': {
        position: absolute,
        bottom: -20,

        [`@media (max-width: ${breakpoints.xs})`]: {
            bottom: -5,
            left: 15
        }
    }
})

const Panel = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
})

const Header = ({ mainImage, title, verified, handleSearchChange }) => {
    const { t } = useTranslation(['common'])

    return (
        <Wrapper className="container-padding">
            <HeaderBackground backgroundImageSrc={mainImage} />

            <Panel>
                <Search handleSearchChange={handleSearchChange} />

                <div className="buttons">
                    <Button variant="outlined" title={t('manageSubscriptions')} customStyles={{ mr: 2 }} />
                    <Button variant="outlined" title={t('share')} />
                </div>
            </Panel>

            <Info imageSrc={mainImage} title={title} verified={verified} />
        </Wrapper>
    )
}

export default Header
