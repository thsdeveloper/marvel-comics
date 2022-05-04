import {
  Box,
  Heading,
  Container,
  Text,
  Flex,
  Center,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import banner from '@public/img/banner.jpg'
import { useColorModeValue } from '@chakra-ui/color-mode'

export default function Home() {
  const colorFont = useColorModeValue('white', 'white')
  return (
    <>
      <Box
        backgroundImage={banner.src}
        bgRepeat="no-repeat"
        bgPosition="center top"
        bgColor={'#0a1117'}
        height="436px"
      >
        <Container maxW={'container.xl'}>
          <Flex h="435" justifyContent={'flex-start'}>
            <Center justifyContent={'flex-start'}>
              <Box width="50%">
                <Heading
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }}
                  lineHeight={'110%'}
                  color={colorFont}
                >
                  CRIE{' '}
                  <Text as={'span'} color={'#f01e22'}>
                    COISAS INCRÍVEIS
                  </Text>{' '}
                  COM O MUNDO MARVEL COMIC <br />
                </Heading>
                <Text color={colorFont} py={4}>
                  A API da Marvel Comics permite que desenvolvedores em todos os
                  lugares acessem informações sobre a vasta biblioteca de
                  quadrinhos da Marvel – desde o que está por vir até 70 anos
                  atrás.
                </Text>
                <Button colorScheme="blue">Descobrir</Button>
              </Box>
            </Center>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
