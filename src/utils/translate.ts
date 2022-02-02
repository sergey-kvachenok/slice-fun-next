import { useRouter } from 'next/router'
import flatten, { unflatten } from 'flat'
// en
import en from 'src/translations/en.json'
import common_en from 'src/translations/en/common.json'
import episodes_en from 'src/translations/en/episodes.json'
import latestShows_en from 'src/translations/en/latestShows.json'
import library_en from 'src/translations/en/library.json'
import shows_en from 'src/translations/en/shows.json'
import sideBar_en from 'src/translations/en/sideBar.json'
import tabs_en from 'src/translations/en/tabs.json'
import verified_en from 'src/translations/en/verified.json'

// ru
import ru from 'src/translations/ru.json'
import common_ru from 'src/translations/ru/common.json'
import episodes_ru from 'src/translations/ru/episodes.json'
import latestShows_ru from 'src/translations/ru/latestShows.json'
import library_ru from 'src/translations/ru/library.json'
import shows_ru from 'src/translations/ru/shows.json'
import sideBar_ru from 'src/translations/ru/sideBar.json'
import tabs_ru from 'src/translations/ru/tabs.json'
import verified_ru from 'src/translations/ru/verified.json'

const useTranslation = () => {
    const router = useRouter()
    const { locale = 'en' } = router
    // console.log('en', en)

    const t = (key: string) => {
        const currentKey = key.split('.')

        console.log('en', unflatten(currentKey, { object: true }))
        return unflatten(currentKey)
    }

    return t
}

export default useTranslation
