import Image from 'next/image'
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface DataProps {
  item: any
  type: 'blog' | 'agenda'
}

export default function CardInfo({ item, type }: DataProps) {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')

  return (
    <Box minW={'100%'}>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        _hover={{
          background: useColorModeValue('blackAlpha.200', 'blackAlpha.500'),
          textDecoration: 'none',
          color: linkHoverColor,
        }}
      >
        {type === 'blog' && (
          <Box
            minW={'100%'}
            h={'200px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <NextLink href={`/${type}/${item.id}`} passHref>
              <Link width={'100%'}>
                <Image
                  src={item.image}
                  layout={'fill'}
                  alt={item.title}
                  priority={true}
                />
              </Link>
            </NextLink>
          </Box>
        )}

        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {type === 'blog' ? type : item.date}
          </Text>
          <NextLink href={`/${type}/${item.id}`} passHref>
            <Link fontSize={'sm'} fontWeight={500} color={linkColor}>
              <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                fontFamily={'body'}
              >
                {item.title}
              </Heading>
            </Link>
          </NextLink>

          {type === 'blog' && (
            <Text color={'gray.500'}>{item.short_description}</Text>
          )}
          {type === 'agenda' && <Text color={'gray.500'}>{item.subtitle}</Text>}
          {type === 'agenda' && <Text color={'gray.500'}>{item.address}</Text>}
        </Stack>
        {type === 'blog' && (
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>UNAADEB</Text>
              <Text color={'gray.500'}>{item.date}</Text>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  )
}
