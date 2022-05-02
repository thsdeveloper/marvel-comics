import { Heading } from '@chakra-ui/layout'
import {
  Box,
  Container,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

interface PropsDataHeading {
  label: string
  icon?: object
  urlButton?: string
}

const HeadingBase = ({ label, icon, urlButton = '' }: PropsDataHeading) => {
  const router = useRouter()

  return (
    <Box
      bg={useColorModeValue('blue.600', 'red.600')}
      color={useColorModeValue('white', 'white')}
      p={2}
    >
      <Container maxW={'container.xl'}>
        <Flex verticalAlign={'middle'} alignItems={'center'}>
          <Box p={2}>{icon}</Box>
          <Box alignItems={'center'} justifyContent={'center'}>
            <Heading as="h1" size="md">
              {label}
            </Heading>
          </Box>
          <Spacer />
          {urlButton != '' ? (
            <>
              <Box paddingRight={4}>
                <Button
                  variant="outline"
                  leftIcon={<FaPlus />}
                  onClick={() => router.push(urlButton)}
                >
                  Adicionar
                </Button>
              </Box>
            </>
          ) : (
            <Box paddingRight={4}>
              <Button
                variant="outline"
                leftIcon={<RiArrowGoBackLine />}
                onClick={() => router.back()}
              >
                Voltar
              </Button>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default HeadingBase
