import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'  // <--- fixed

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App
