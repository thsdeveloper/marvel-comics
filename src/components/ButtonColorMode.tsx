import { useColorMode } from '@chakra-ui/color-mode'
import { Button } from '@chakra-ui/react'
import { MdLightMode } from 'react-icons/md'

export default function ButtonColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button
        onClick={toggleColorMode}
        variant="outline"
        leftIcon={<MdLightMode />}
      >
        {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  )
}
