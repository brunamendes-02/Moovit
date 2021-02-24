import '../styles/globals.css'

import {ChalangesProvider } from '../contexts/ChalangeContext'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <ChalangesProvider>
      <Component {...pageProps} />
    </ChalangesProvider>
  )
}

export default MyApp
