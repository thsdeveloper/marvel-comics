import {
  Box,
  Heading,
  Container,
  Text,
  Flex,
  Center,
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import banner from '@public/img/estranho.jpg'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useSelector } from 'react-redux'
import { removeFavorites, selectCharacters } from '@src/store/charactersSlice'
import { useDispatch } from 'react-redux'
import CharacterBox from '@src/components/character/characterBox'
import { GrClose } from 'react-icons/gr'
import { IconButton } from '@chakra-ui/button'
import AlertContext from '@src/contexts/AlertContext'

export default function Home() {
  const dispatch = useDispatch()
  const alert = useContext(AlertContext)
  const [loading, setLoading] = useState(false)
  const colorFont = useColorModeValue('white', 'white')
  const { favorites } = useSelector(selectCharacters)

  const handleRemoveCharacter = async (character) => {
    await setLoading(true)
    await setTimeout(() => {
      dispatch(removeFavorites(character))
      alert.success('Removido com sucesso.')
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <Box
        backgroundImage={banner.src}
        bgRepeat="no-repeat"
        bgPosition="center top"
        bgColor={'#030409'}
        height="436px"
      >
        <Container maxW={'container.xl'}>
          <Flex h="435" justifyContent={'flex-start'}>
            <Center justifyContent={'flex-start'}>
              <Box width="45%">
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
              </Box>
            </Center>
          </Flex>
        </Container>
        <Box py={10} bgColor={'#393939'}>
          <Container maxW={'container.xl'}>
            <Heading as="h2" size="lg" pb={5}>
              PERSONAGENS FAVORITOS
            </Heading>

            <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
              {favorites.map((character) => (
                <Box position={'relative'} key={character.id}>
                  <CharacterBox character={character} />
                  <Box position={'absolute'} top={-2} right={-2} zIndex={1}>
                    <IconButton
                      icon={<GrClose />}
                      isLoading={loading}
                      fontSize="14px"
                      color={'red'}
                      backgroundColor={'white'}
                      borderRadius="50%"
                      onClick={() => handleRemoveCharacter(character)}
                      aria-label="theme_button"
                    />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>

            {favorites.length <= 0 && (
              <Box>
                <Text>
                  Você ainda não possui <strong>personagens</strong> adicionado
                  aos favoritos.
                </Text>
                <Box pt={4}>
                  <NextLink href="/characters" passHref>
                    <Button colorScheme="teal" variant="outline">
                      Adicionar novos favoritos
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
        <Box bgColor="#f01e21">
          <Container maxW={'container.xl'}>
            <Center h="100px" color="white">
              <Text as="kbd" fontSize={12} fontWeight="800">
                Desenvolvido por: Thiago Pereira | A API da Marvel Comics é uma
                ferramenta para ajudar desenvolvedores em todos os lugares a
                criar sites e aplicativos incríveis, estranhos e incríveis
                usando dados de mais de 70 anos da era dos quadrinhos da Marvel.
              </Text>
            </Center>
          </Container>
        </Box>
      </Box>
    </>
  )
}
