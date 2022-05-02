import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface AlertContextData {
  message: string
  duration?: number
  success: (text: string, time?: number) => void
  error: (text: string, time?: number) => void
  warning: (text: string, time?: number) => void
  clear: () => void
}

const AlertContext = React.createContext<AlertContextData>(
  {} as AlertContextData
)

const AlertProvider: React.FC = ({ children }) => {
  // const [alertType, setAlertType] = useState<MessageType>('default')
  // const { addToast } = useToasts()

  const [message, setMessage] = useState<string>('')
  const [duration, setDuration] = useState<number>(5000)

  // const notify = () => toast('Here is your toast.')

  return (
    <AlertContext.Provider
      value={{
        message: message,
        duration: duration,
        success: (text: string, time?: number) => {
          setMessage(text)
          toast.success(text, { duration: time })
          time && setDuration(time)
        },
        error: (text: string, time?: number) => {
          setMessage(text)
          toast.error(text, { duration: time })
          time && setDuration(time)
        },
        warning: (text: string, time?: number) => {
          setMessage(text)
          toast.error(text, { duration: time })
          time && setDuration(time)
        },
        clear: () => {
          setMessage('')
          toast.success(
            'Default message clear index profile to red from compile as off date'
          )
        },
      }}
    >
      {children}
      <Toaster position={'top-center'} />
    </AlertContext.Provider>
  )
}

export { AlertProvider }
export default AlertContext
