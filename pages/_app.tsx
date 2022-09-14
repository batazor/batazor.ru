import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { DefaultSeo, LogoJsonLd } from "next-seo"

import '../styles/globals.css'
import {Fragment} from "react";

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Fragment>
        <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'https://batazor.ru/',
              site_name: 'Login Viktor @batazor',
              images: [
                {
                  url: 'https://batazor.ru/batazor.png',
                  width: 400,
                  height: 400,
                  alt: 'batazor.ru',
                },
              ],
            }}
            twitter={{
              handle: '@batazor',
              site: '@batazor',
              cardType: 'summary_large_image',
            }}
            titleTemplate={'Login Viktor @batazor | %s'}
            defaultTitle={'Welcome'}
        />

        <LogoJsonLd
            logo="https://batazor.ru/batazor.png"
            url="https://batazor.ru/"
        />

        <Component {...pageProps} />
      </Fragment>
  )
}

export default MyApp
