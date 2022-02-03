// libraries
import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'
// components
import Button from 'src/components/shared/Button'
import Search from 'src/components/shared/Search'
import HeaderBackground from 'src/components/shared/HeaderBackground'
import Info from 'src/components/Show/Header/Info'
// utils
import { breakpoints } from 'src/utils/theme'

const Wrapper = styled('div')({
    height: 250,
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'auto',

    '.content-container': {
        position: 'absolute',
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

type HeaderProps = {
    mainImage: string
    title: string
    verified: boolean
    handleSearchChange: Function
}

const Header = ({ mainImage, title, verified, handleSearchChange }: HeaderProps) => {
    const { t } = useTranslation(['common'])

    return (
        <Wrapper className="container-padding">
            <HeaderBackground backgroundImageSrc={mainImage} />

            <Panel>
                <Search handleSearchChange={handleSearchChange} />

                <div className="buttons">
                    <Button
                        variant="outlined"
                        title={t('manageSubscriptions')}
                        customStyles={{ mr: 2 }}
                        onClick={() => {}}
                    />

                    <Button variant="outlined" title={t('share')} onClick={() => {}} />
                </div>
            </Panel>

            <Info imageSrc={mainImage} title={title} verified={verified} />
        </Wrapper>
    )
}

export default Header
