import React from 'react'
import Head from 'next/head'
import {
  Container,
  Flex,
  Center,
  Heading,
  Box,
  Text,
  List,
  Link,
  ListItem,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

export default function CharacterPage() {
  const router = useRouter()

  const { id } = router.query

  const fetcher = (url) => axios.get(url).then((res) => res.data)

  const { data: character, error } = useSWR(
    () => '/api/characters/' + id,
    fetcher
  )

  if (error) {
    return (
      <>
        <div>Error encountered ...</div>
      </>
    )
  }

  if (!character) {
    return (
      <>
        <Head>
          <title>PocketMarvel | Character</title>
        </Head>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>PocketMarvel | {character.name}</title>
      </Head>
      <Box
        h="250px"
        rounded="md"
        pos="relative"
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${
            character.thumbnail.path + '.' + character.thumbnail.extension
          })`,
          filter: 'blur(80px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(80px)',
          },
        }}
      >
        <Container maxW="container.xl">
          <Flex color="white" height="400px" alignItems={'center'}>
            <Center bg="green.500">
              <Box boxSize={['xs', 'xs']} pos="relative">
                <Image
                  src={
                    character.thumbnail.path +
                    '.' +
                    character.thumbnail.extension
                  }
                  alt="chr_img"
                  layout="fill"
                  objectFit="cover"
                  className="page_image"
                />
              </Box>
            </Center>
            <Box flex="1" p={6}>
              <Heading as="h1" fontSize="6xl" py={4}>
                {character.name}
              </Heading>
              <Text w="full" py={4}>
                {character.description !== ''
                  ? character.description
                  : 'No brief description available for this character. Check out the information links below.'}
              </Text>
              {character.urls.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  _hover={{
                    textDecoration: 'none',
                    color: 'cyan.900',
                  }}
                  isExternal
                >
                  <Button variant="outline" mr={2}>
                    {(link.type === 'detail' && 'Biography') ||
                      (link.type === 'wiki' && 'Wiki') ||
                      (link.type === 'comiclink' && 'Comic Link')}
                  </Button>
                </Link>
              ))}
            </Box>
          </Flex>

          <Box p={5}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%">
                <Text fontWeight="bold" fontSize="2xl" py={4}>
                  Comics
                </Text>
                <List>
                  {character.comics.items.map((comic) => (
                    <ListItem key={comic.resourceURI}>{comic.name}</ListItem>
                  ))}
                </List>
              </GridItem>
              <GridItem w="100%">
                <Text fontWeight="bold" fontSize="2xl" py={4}>
                  Series
                </Text>
                <List>
                  {character.series.items.map((serie) => (
                    <ListItem key={serie.resourceURI}>{serie.name}</ListItem>
                  ))}
                </List>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}
