import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import HeaderComponent from '@src/components/HeaderComponent'
import { AuthProvider } from '@src/contexts/AuthContext'
import { AlertProvider } from '@src/contexts/AlertContext'
import ModalDialogContextProvider from '@src/contexts/ModalDialogContext'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '@src/store'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css'
import { Router } from 'next/router' //styles of nprogress

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          MARVEL COMICS - CRIE COISAS INCRÍVEIS COM O MUNDO MARVEL COMIC
        </title>
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <AlertProvider>
            <ModalDialogContextProvider>
              <AuthProvider>
                <HeaderComponent />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*// @ts-ignore*/}
                <Component {...pageProps} />
              </AuthProvider>
            </ModalDialogContextProvider>
          </AlertProvider>
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default MyApp
