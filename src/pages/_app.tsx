import React from 'react'

import {ChallengesProvider } from '../contexts/ChallengeContext';
import {CountDownProvider} from '../contexts/CountDownContext';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      {/* <CountDownProvider> */}
        <Component {...pageProps} />
      {/* </CountDownProvider> */}
    </ChallengesProvider>
  )
}

export default MyApp
