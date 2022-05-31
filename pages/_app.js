import '../styles/globals.css'

import React, { useState } from "react"
import { AuthContext } from '../Contexts/AuthContext'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  const [_donor, _setDonor] = useState(true)
  const [_admin, _setAdmin] = useState(true)
  const [_NGO, _setNGO] = useState(true)
  
  // const [_donor, _setDonor] = useState(null)
  // const [_admin, _setAdmin] = useState(null)
  // const [_NGO, _setNGO] = useState(null)

  return (
    <AuthContext.Provider value={{ _donor, _setDonor, _admin, _setAdmin, _NGO, _setNGO }}>
      <Component {...pageProps} />
    </AuthContext.Provider>

  )
}

export default MyApp
