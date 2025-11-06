import { createContext, useContext, useState} from 'react'

type AuthContextType = {
  authToken: string | void | undefined
  login: (token: string) => void 
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: any }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)

  const login = (token: string) => {
    setAuthToken(token)
    console.log('Token:', token)
  }

  const logout = () => {
    setAuthToken(undefined)
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

