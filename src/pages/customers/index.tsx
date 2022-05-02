import { GetServerSideProps } from 'next'
import { Container } from '@chakra-ui/layout'
import {
  Heading,
  Avatar,
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react'
import HeadingPage from '@src/components/HeadingPage'
import * as serviceCustomers from '@src/services/customers'
import { CustomerProps } from '@src/services/auth'

export default function Customers({ customers }) {
  const color = useColorModeValue('white', 'gray.900')
  const color2 = useColorModeValue('gray.700', 'gray.400')
  return (
    <Container maxW={'container.xl'}>
      <HeadingPage
        title={'Usuários'}
        subtitle={'Lista de usuários do UNAADEB Play'}
      />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
        {customers.map((user: CustomerProps) => (
          <Box
            key={user.id}
            bg={color}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <Avatar
              size={'lg'}
              src={user.photo}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'lg'}>{user.name}</Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4} fontSize={'sm'}>
              {user.email}
            </Text>
            <Text textAlign={'center'} color={color2} px={3}>
              {user.sector}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const customers = await serviceCustomers.list()

  return {
    props: {
      customers: customers,
    },
  }
}
