import { styled } from '@mui/system'
import { colors, zIndexes } from 'src/utils/theme'
import { useTranslation } from 'next-i18next'

const StyledInput = styled('input')({
    cursor: 'pointer',
    padding: '4 5',
    borderRadius: 5,
    fontSize: 16,
    border: `2 solid ${colors.pink}`,
    outline: 'none',
    zIndex: `${zIndexes.search}`,
    marginBottom: 10,

    '& [:focus] [:active]': {
        borderColor: `${colors.coralRed}`
    },

    ['@media (hover: hover)']: {
        '&:hover': {
            borderColor: `${colors.coralRed}`
        }
    }
})

const Search = ({ handleSearchChange }) => {
    const { t } = useTranslation(['shows'])

    const handleChange = (event) => {
        handleSearchChange(event.target.value)
    }

    return <StyledInput data-testid="search-input" placeholder={t('search')} onChange={handleChange} />
}

export default Search
