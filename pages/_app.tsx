// libraries
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector } from 'react-redux'
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
import { store, persistor, RootState } from 'store'
// styles
import 'styles/globals.css'
import App from 'src/components/App'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppProps & { emotionCache: any }) {
    const { emotionCache = clientSideEmotionCache } = props

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App {...props} />
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default appWithTranslation(MyApp)
