import AppLayout from '@/components/AppLayout'
import AppWrapper from '@/components/AppWrapper'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppWrapper>
  )
}
