import { useTranslation } from 'next-i18next'
import { styled } from '@mui/system'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const Wrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',

    '.verified-box': {
        borderRadius: 3,
        display: 'inline-block',
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})

const Verified = ({ verified }) => {
    const { t } = useTranslation(['verified'])

    return (
        <Wrapper>
            <div className="verified-box">
                {verified ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
            </div>
            <span className="secondary-text">{verified ? t('verified') : t('notVerified')}</span>
        </Wrapper>
    )
}

export default Verified
