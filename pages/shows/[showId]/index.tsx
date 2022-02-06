// libraries
import Head from 'next/head'
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

    // if (isLoading) {
    //     return <Spinner />
    // }

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
        <>
            <Head>
                <title>The first blog page(1996)</title>
                <meta property="og:title" content="The third blog page" />
                <meta property="og:type" content="video.movie" />
                <meta
                    property="og:url"
                    content="https://b193-2a02-a310-823a-5680-115f-2aac-2f72-81c9.ngrok.io/shows/3"
                />
                <meta
                    property="og:image"
                    content="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/record-classix.jpeg"
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Custom Description. It works" />
                <meta property="og:description" content="It works also og " />
                {/* <meta property="image" content="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/record-classix.jpeg" />
              <meta property="og:image" content="https://slice-fun-podcasts.s3.eu-west-1.amazonaws.com/record-classix/record-classix.jpeg" /> */}
            </Head>

            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <Header
                        handleSearchChange={handleSearchChange}
                        verified={verified}
                        title={title}
                        mainImage={mainImage}
                    />
                    <Headlines headlines={headlines} />
                    <Episodes latestEpisodes={latest} premiumEpisodes={premium} video={video} />
                </div>
            )}
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['shows', 'sideBar', 'common']))
    }
})

export default Show
