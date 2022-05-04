import React from 'react'
import { Box, Stack, Text, chakra, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

const CharacterBox = ({ character }) => {
  const IMAGE = character.thumbnail.path + '.' + character.thumbnail.extension

  return (
    <>
      <Link href={`/characters/${character.id}`} passHref>
        <chakra.a
          transition="all"
          transitionDuration="0.5s"
          _hover={{
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <Box
            maxW="100%"
            w="full"
            overflow="hidden"
            role="group"
            p={6}
            bg={useColorModeValue('gray.100', 'gray.800')}
            pos="relative"
            zIndex={1}
          >
            <Box
              h="250px"
              bg="gray.100"
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
                backgroundImage: `url(${IMAGE})`,
                filter: 'blur(50px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(10px)',
                },
              }}
            >
              <Image
                src={
                  character.thumbnail.path + '.' + character.thumbnail.extension
                }
                alt="char_img"
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Stack align="center" py={5}>
              <Text fontWeight="bold" noOfLines={5} fontSize="lg">
                {character.name}
              </Text>
            </Stack>
          </Box>
        </chakra.a>
      </Link>
    </>
  )
}

export default CharacterBox
