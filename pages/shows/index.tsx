// libraries
import { useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import debounce from 'lodash.debounce'
import Grid from '@mui/material/Grid'
// components
import Show from 'src/components/shared/Show'
import Spinner from 'src/components/shared/Spinner'
import Search from 'src/components/shared/Search'
import { ListWrapper } from 'src/components/shared/containers'
// store
import { useGetShowsQuery } from 'store/queries/shows'

const debounceDelay = 500

const Shows = () => {
    const { t } = useTranslation(['shows'])
    const [searchQuery, setSearchQuery] = useState('')
    const { data, isLoading } = useGetShowsQuery({ search: searchQuery })

    const getDebouncedSearchResult = useCallback(
        debounce((value) => {
            setSearchQuery(value)
        }, debounceDelay),
        []
    )

    if (isLoading) {
        return <Spinner />
    }

    const handleSearchChange = (inputValue: string) => {
        getDebouncedSearchResult(inputValue)
    }

    const isEmpty = !data?.length
    const searchResultContent = isEmpty ? (
        <div className="primary-text">{t('noResults')}</div>
    ) : (
        <Grid container spacing={4} sx={{ padding: 0 }}>
            {data.map((show) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ justifyContent: 'center', display: 'flex' }}
                    key={show.title}
                >
                    <Show dataTestId="searched-shows-item" show={show} />
                </Grid>
            ))}
        </Grid>
    )

    return (
        <>
            <ListWrapper>
                <Search handleSearchChange={handleSearchChange} />
            </ListWrapper>
            <ListWrapper>{searchResultContent}</ListWrapper>
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['shows', 'sideBar']))
    }
})

export default Shows
