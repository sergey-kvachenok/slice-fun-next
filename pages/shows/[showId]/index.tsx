// libraries
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// components
import Spinner from 'src/components/shared/Spinner'
import Header from 'src/components/Show/Header'
import Headlines from 'src/components/Show/Headlines'
import Episodes from 'src/components/Show/Episodes'
// store
import { useGetShowsByIdQuery } from 'store/queries/shows'

const debounceDelay = 500

const Show = () => {
    const router = useRouter()
    const { showId: id = '' } = router.query || {}

    const [searchQuery, setSearchQuery] = useState('')

    const { data, isLoading } = useGetShowsByIdQuery({
        id,
        search: searchQuery
    })

    const getDebouncedSearchResult = useCallback(
        debounce((value: string) => {
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

    const {
        verified = false,
        mainImage = '',
        title = '',
        headlines = [],
        latest = [],
        premium = [],
        video = []
    } = data || {}

    return (
        <div>
            <Header handleSearchChange={handleSearchChange} verified={verified} title={title} mainImage={mainImage} />
            <Headlines headlines={headlines} />
            <Episodes latestEpisodes={latest} premiumEpisodes={premium} video={video} />
        </div>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['shows', 'sideBar', 'common']))
    }
})

export default Show
