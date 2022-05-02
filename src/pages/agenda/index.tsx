import type { GetStaticProps } from 'next'
import { Container } from '@chakra-ui/layout'
import { Box, Stack, SimpleGrid } from '@chakra-ui/react'
import CardInfo from '@src/components/CardInfo'
import HeadingPage from '@src/components/HeadingPage'
import * as service from '@src/services/agenda'
import { formatData } from '@src/utils/formats'
import { AgendaProps } from '@src/services/agenda'

export default function Agendas({ agendas }) {
  return (
    <>
      <Container maxW={'container.xl'}>
        <HeadingPage
          title={'Agenda Geral da UNAADEB'}
          subtitle={'Confira as agenda setoriais e geral da UNAADEB'}
        />
        <Box>
          <SimpleGrid columns={{ base: 1, sm: 1, md: 1 }} spacing={8}>
            {agendas.map((agenda: AgendaProps) => {
              return (
                <Stack align={'flex-start'} key={agenda.id}>
                  <CardInfo item={agenda} type={'agenda'} />
                </Stack>
              )
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await service.getList()

  const response = data.map((item) => {
    return {
      ...item,
      date: formatData(item.date),
    }
  })

  return {
    props: {
      agendas: response,
    },
    revalidate: 60,
  }
}
