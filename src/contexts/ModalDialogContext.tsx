import React, { useContext, useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

type UseModalShowReturnType = {
  show: boolean
  setShow: (value: boolean) => void
  onHide: () => void
}

const useModalShow = (): UseModalShowReturnType => {
  const [show, setShow] = useState(false)

  const handleOnHide = () => {
    setShow(false)
  }

  return {
    show,
    setShow,
    onHide: handleOnHide,
  }
}

type ModalContextType = {
  showConfirmation: (
    title: string,
    message: string | JSX.Element,
    confirmText?: string | JSX.Element
  ) => Promise<boolean>
}

type ModalDialogContextProviderProps = {
  children: React.ReactNode
}

const ConfirmationModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
)

const ModalDialogContextProvider: React.FC<ModalDialogContextProviderProps> = (
  props
) => {
  const { setShow, show, onHide } = useModalShow()
  const [content, setContent] = useState<{
    title: string
    message: string | JSX.Element
    confirmText?: string
  } | null>()

  const resolver = useRef<Function>()

  const handleShow = (
    title: string,
    message: string | JSX.Element,
    confirmText: string
  ): Promise<boolean> => {
    setContent({
      title,
      message,
      confirmText,
    })
    setShow(true)
    return new Promise(function (resolve) {
      resolver.current = resolve
    })
  }

  const modalContext: ModalContextType = {
    showConfirmation: handleShow,
  }

  const handleOk = () => {
    resolver.current && resolver.current(true)
    onHide()
  }

  const handleCancel = () => {
    resolver.current && resolver.current(false)
    onHide()
  }

  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}

      {content && (
        <Modal isOpen={show} onClose={onHide}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{content.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{content.message}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCancel}>
                Fechar
              </Button>
              <Button variant="ghost" onClick={handleOk}>
                {content.confirmText}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ConfirmationModalContext.Provider>
  )
}

const useConfirmationModalContext = (): ModalContextType =>
  useContext(ConfirmationModalContext)

export { useModalShow, useConfirmationModalContext }

export default ModalDialogContextProvider
