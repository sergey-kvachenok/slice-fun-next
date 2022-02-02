// libraries
import { useTranslation } from 'next-i18next'
import Grid from '@mui/material/Grid'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// components
import HeadShow from 'src/components/LatestShows/HeadShow'
import Show from 'src/components/shared/Show'
import Spinner from 'src/components/shared/Spinner'
import { ListWrapper } from 'src/components/shared/containers'
// constants
import { IPopularShow } from 'src/constants/interfaces'
// store
import { useGetPopularShowsQuery } from 'store/queries/shows'

const LatestShows = () => {
    const { data = [], isLoading } = useGetPopularShowsQuery()
    const { t } = useTranslation(['latestShows'])

    if (isLoading) {
        return <Spinner />
    }

    const firstShow: IPopularShow = data[0]
    const transformedData = data.slice(1)

    return (
        <>
            <HeadShow showData={firstShow} />
            <ListWrapper>
                <div className="primary-text">{t('latestShowsTitle')}</div>
                <Grid container spacing={4}>
                    {transformedData.map((show) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
                            <Show dataTestId="latest-shows-item" show={show} />
                        </Grid>
                    ))}
                </Grid>
            </ListWrapper>
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['latestShows', 'sideBar']))
    }
})

export default LatestShows
