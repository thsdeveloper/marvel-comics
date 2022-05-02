import { GetServerSideProps } from 'next'
import { Container } from '@chakra-ui/layout'
import {
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Avatar,
  Button,
  Center,
  Link,
  Stack,
  Box,
} from '@chakra-ui/react'

import HeadingPage from '@src/components/HeadingPage'
import * as serviceLeaderships from '@src/services/leadership'
import { LeaderProps, LeadershipsProps } from '@src/services/leadership'

export default function Leadership({ leaderships }) {
  const color = useColorModeValue('blue.500', 'blue.900')
  const color2 = useColorModeValue('white', 'gray.900')
  return (
    <Container maxW={'container.xl'}>
      <HeadingPage
        title={`Liderança ${new Date().getFullYear()}`}
        subtitle={'Diretoria Geral da UNAADEB'}
      />
      {leaderships.map((leaderships: LeadershipsProps) => (
        <Box key={leaderships.id}>
          <Box bgColor={color} p={2} borderRadius={5}>
            {leaderships.title}
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
            {leaderships.items.map((leader: LeaderProps) => (
              <Center py={2} key={leader.name}>
                <Stack
                  borderWidth="1px"
                  borderRadius="lg"
                  w={{ sm: '100%', md: '100%' }}
                  height={{ sm: '476px', md: '200px' }}
                  direction={{ base: 'column', md: 'row' }}
                  bg={color2}
                  boxShadow={'2xl'}
                  padding={4}
                >
                  <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                  >
                    <Avatar size="2xl" name={leader.name} src={leader.avatar} />
                  </Stack>
                  <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                  >
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      {leader.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                      {leader.description}
                    </Text>
                    <Stack
                      width={'100%'}
                      mt={'2rem'}
                      direction={'row'}
                      padding={2}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                          bg: 'gray.200',
                        }}
                        disabled={true}
                      >
                        Mensagens
                      </Button>
                      <Link href={leader.socialMediaUrl} target={'_blank'}>
                        <Button
                          flex={1}
                          fontSize={'sm'}
                          rounded={'full'}
                          bg={'blue.400'}
                          color={'white'}
                          boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                          }
                          _hover={{
                            bg: 'blue.500',
                          }}
                          _focus={{
                            bg: 'blue.500',
                          }}
                        >
                          Rede Social
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Center>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const leaderships = await serviceLeaderships.list()

  return {
    props: {
      leaderships: leaderships,
    },
  }
}
