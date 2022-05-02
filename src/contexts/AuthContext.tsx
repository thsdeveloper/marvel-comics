import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'

import AlertContext from '@src/contexts/AlertContext'
import * as auth from '@src/services/auth'
import { User } from '@src/services/auth'

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn(): Promise<void>
  signInForm(email: string, pass: string): Promise<void>
  signOut(): void
  updateUserState: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const alert = useContext(AlertContext)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = useCallback(async () => {
    const storagedUser = localStorage.getItem('@RNAuth:user')

    if (storagedUser) {
      setUser(JSON.parse(storagedUser))
    }
    setLoading(false)
  }, [])

  async function signIn() {
    try {
      setLoading(true)
      const response: any = await auth.signIn()
      if (response) {
        const getUserInfo: any = await auth.getUserInfo(response?.user?.email)
        if (getUserInfo) {
          const sanitizeData = {
            ...getUserInfo.user,
            photo: getUserInfo?.user.photo || response.user.photo,
            userType: response.user.userType,
          }
          setUser(sanitizeData)

          await localStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(sanitizeData)
          )
        } else {
          const customerData: auth.CustomerProps = {
            name: response.user.name,
            email: response.user.email,
            photo: response.user.photo || '',
            userType: 'google',
          }
          await auth.addCustomer(customerData)

          setUser(response?.user)

          await localStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(response?.user)
          )
        }
      } else {
        throw new Error('Falha ao realizar login')
      }
    } catch (err: any) {
      if (err?.error) {
        alert.error(err?.error)
      }
      if (err?.warning) {
        alert.warning(err?.warning)
      }
    } finally {
      setLoading(false)
    }
  }

  async function signInForm(email: string, password: string) {
    try {
      setLoading(true)
      const response: any = await auth.signInForm(email, password)
      if (response?.error) {
        alert.error(response.error)
        return
      }

      const getUserInfo: any = await auth.getUserInfo(email)
      if (getUserInfo) {
        setUser(getUserInfo?.user)
        await localStorage.setItem(
          '@RNAuth:user',
          JSON.stringify(getUserInfo?.user)
        )
      }
    } catch (error) {
      alert.error('Falha na autenticação, verifique seus dados')
    } finally {
      setLoading(false)
    }
  }

  async function updateUserState() {
    if (user?.email) {
      try {
        const response: any = await auth.getUserInfo(user?.email)
        if (response) {
          setUser(response?.user)
          await localStorage.clear()
          await localStorage.setItem('@RNAuth:user', JSON.stringify(user))
        }
      } catch (error) {
        return
      }
    }
  }

  async function signOut() {
    const status = await auth.sair()

    if (status) {
      await localStorage.clear()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        signInForm,
        updateUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
