// libraries
import { useRef, useEffect, useCallback } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
// components
import SideBarContainer from 'src/components/SideBar/SideBarContainer'
import SideBarBurgerButton from 'src/components/shared/SideBarBurgerButton'
import GlobalStyles from 'styles/global'
import AudioPlayer from 'src/components/AudioPlayer'
// utils
import createEmotionCache from 'src/utils/createEmotionCache'
import theme from 'src/utils/theme'
// store
import { store, RootState } from 'store'
import { setCurrentTime, setIsPlaying, setDuration } from 'store/slices/playerSlice'
// style

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppProps) {
    const dispatch = useDispatch()
    const { Component, pageProps } = props

    const player = useSelector(({ player }: RootState) => player)
    useEffect(() => {
        dispatch(setIsPlaying(false))
    }, [dispatch])

    const { id } = player
    // console.log('id', player)

    return (
        <>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <SideBarContainer />
                    <SideBarBurgerButton />
                </Grid>

                <Grid item sx={{ padding: 0 }} xs={12} sm={8} md={9} lg={10}>
                    <Component {...pageProps} />
                </Grid>
            </Grid>
            <AudioPlayer />
        </>
    )
}

export default MyApp
