import type { GetStaticProps } from 'next'
import { NewsProps } from '@src/services/noticias'
import { Container } from '@chakra-ui/layout'
import { Box, Stack, SimpleGrid } from '@chakra-ui/react'
import CardInfo from '@src/components/CardInfo'
import HeadingPage from '@src/components/HeadingPage'
import * as service from '@src/services/noticias'
import { formatData } from '@src/utils/formats'

export default function BlogPost({ posts }) {
  return (
    <>
      <Container maxW={'container.xl'}>
        <HeadingPage
          title={'Artigos e notícias'}
          subtitle={
            'As últimas informaçãoes mais importantes sempre atualizadas'
          }
        />
        <Box>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            {posts.map((post: NewsProps) => {
              return (
                <Stack align={'flex-start'} key={post.id}>
                  <CardInfo item={post} type={'blog'} />
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
      posts: response,
    },
    revalidate: 60,
  }
}
