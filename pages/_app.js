import '../styles/globals.css'

import React, { useState } from "react"
import { AuthContext } from '../Contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  const [_user, _setUser] = useState(null)
  const [_admin, _setAdmin] = useState(null)
  const [_NGO, _setNGO] = useState(null)

  return (
    <AuthContext.Provider value={{ _user, _setUser, _admin, _setAdmin, _NGO, _setNGO }}>
      <Component {...pageProps} />
    </AuthContext.Provider>

  )
}

export default MyApp
