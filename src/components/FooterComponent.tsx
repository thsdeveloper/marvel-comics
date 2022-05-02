import { ReactNode } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import * as packageInfo from '../../package.json'

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaYoutube, FaInstagram } from 'react-icons/fa'

import googlePlayDark from '@public/img/google-play-dark.png'
import googlePlayLigth from '@public/img/google-play-ligth.png'

import appleStoreDark from '@public/img/apple-store-dark.png'
import appleStoreLigth from '@public/img/apple-store-ligth.png'

import { useColorMode } from '@chakra-ui/color-mode'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function FooterComponent() {
  const date = new Date().getFullYear()
  const { colorMode } = useColorMode()
  const urlGooglePlay =
    'https://play.google.com/store/apps/details?id=com.unaadebplay'
  const urlAppleStore = '#'

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={4}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>A UNAADEB</ListHeader>
            <Link href={'#'}>Sobre nós</Link>
            <Link href={'http://unaadeb.com.br/'} isExternal>
              Nosso site
            </Link>
            <NextLink href="/blog" passHref>
              <Link>Blog</Link>
            </NextLink>
            <Link href={'#'}>Contatos</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Contatos e Suporte</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Safety Center</Link>
            <Link href={'#'}>Community Guidelines</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Law Enforcement</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Baixe agora nosso App</ListHeader>
            <Link isExternal href={urlGooglePlay}>
              <Image
                src={colorMode === 'dark' ? googlePlayLigth : googlePlayDark}
                alt="Google Play"
                height={40}
                width={200}
              />
            </Link>
            <Link href={urlAppleStore}>
              <Image
                src={colorMode === 'dark' ? appleStoreLigth : appleStoreDark}
                alt="Apple Store"
                height={40}
                width={200}
              />
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>
            © {date} UnaadebPlay. Todos os direitos reservados | Versão do
            Sistema: {packageInfo.version}
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton
              label={'YouTube'}
              href={'https://www.youtube.com/c/UnaadebBras%C3%ADlia'}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={'Instagram'}
              href={'https://www.instagram.com/unaadeb.brasilia/'}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
