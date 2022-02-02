// libraries
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dayjs from 'dayjs'
import Image from 'next/image'
// components
import Spinner from 'src/components/shared/Spinner'
import Table from 'src/components/shared/Table'
import Tabs from 'src/components/shared/Tabs'
import { ListWrapper, ImageWrapper } from 'src/components/shared/containers'
// constants
import { Row } from 'src/constants/types'
import { ILibraryShow } from 'src/constants/interfaces'
// store
import { useGetLibraryQuery } from 'store/queries/shows'

type RowDataProps = {
    image: string
    title: string
    description: string
    date: string
}

const createData = (...columns: React.ReactElement[]) => {
    return columns.reduce((acc, column, index) => ({ ...acc, [`column-${index + 1}`]: column }), {})
}

const getRows = (data: RowDataProps[] | ILibraryShow[] = []) => {
    return data.map((item) => {
        const { image, title, description, date } = item

        const firstColumn = (
            <ImageWrapper width={70} height={70}>
                <Image width="70" height="70" src={image} alt="Library Episode" />
            </ImageWrapper>
        )

        const secondColumn = (
            <div>
                <div className="secondary-text-bold">{title}</div>
                <div className="secondary-text">{description}</div>
            </div>
        )

        const thirdColumn = <div>{dayjs(new Date(date)).format('MMM D, YYYY')}</div>

        return createData(firstColumn, secondColumn, thirdColumn)
    })
}

const getColumns = (t: Function) => [
    {
        label: t('columns.firstColumn')
    },
    {
        label: t('columns.secondColumn')
    },
    {
        label: t('columns.thirdColumn')
    }
]

const getTabs = (t: Function) => [
    {
        slug: 'latestUnplayed',
        label: t('tabs.firstTab')
    },
    {
        slug: 'all',
        label: t('tabs.secondTab')
    },
    {
        slug: 'purchased',
        label: t('tabs.thirdTab')
    },
    {
        slug: 'downloaded',
        label: t('tabs.fourthTab')
    }
]

const Library = () => {
    const { t } = useTranslation(['library'])
    const [activeTab, setActiveTab] = useState('latestUnplayed')
    const { data, isLoading } = useGetLibraryQuery({ category: activeTab }, { refetchOnReconnect: true })

    const columns = getColumns(t)
    const tabs = getTabs(t)

    if (isLoading) {
        return <Spinner />
    }

    const handleTabChange = (slug: string) => {
        setActiveTab(slug)
    }

    const rows: Row[] = getRows(data)
    const currentTabs = tabs.map((tab) => ({ ...tab, clickHandler: () => handleTabChange(tab.slug) }))

    return (
        <ListWrapper>
            <Tabs customStyles={{ marginBottom: '20px' }} tabs={currentTabs} />
            <Table columns={columns} rows={rows} />
        </ListWrapper>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['library', 'sideBar']))
    }
})

export default Library
