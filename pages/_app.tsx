// libraries
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
// components
import SideBarContainer from 'src/components/SideBar/SideBarContainer'
import SideBarBurgerButton from 'src/components/shared/SideBarBurgerButton'
import GlobalStyles from 'styles/global'
// utils
import createEmotionCache from 'src/utils/createEmotionCache'
import theme from 'src/utils/theme'
// store
import { store } from 'store'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppProps & { emotionCache: any }) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Provider store={store}>
                    <Grid container direction="row" justifyContent="center">
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <SideBarContainer />
                            <SideBarBurgerButton />
                        </Grid>

                        <Grid item sx={{ padding: 0 }} xs={12} sm={8} md={9} lg={10}>
                            <Component {...pageProps} />
                        </Grid>
                    </Grid>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default appWithTranslation(MyApp)
