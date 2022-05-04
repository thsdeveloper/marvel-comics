import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import HeaderComponent from '@src/components/HeaderComponent'
import { AuthProvider } from '@src/contexts/AuthContext'
import { AlertProvider } from '@src/contexts/AlertContext'
import ModalDialogContextProvider from '@src/contexts/ModalDialogContext'
import Head from 'next/head'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css'
import { Router } from 'next/router' //styles of nprogress

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
      <ChakraProvider>
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
    </>
  )
}

export default MyApp
