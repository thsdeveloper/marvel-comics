import { NewsProps } from '@src/services/noticias'
import * as service from '@src/services/noticias'
import { Container } from '@chakra-ui/layout'
import { Heading, Box, Flex, Text } from '@chakra-ui/react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { formatData } from '@src/utils/formats'

interface DataProps {
  post: NewsProps
}

export default function BlogPost({ post }: DataProps) {
  const { isFallback } = useRouter()

  // Se a página ainda não foi gerada, isso será exibido
  // inicialmente até getStaticProps() terminar a execução
  if (isFallback) {
    return <Box>Carregando...</Box>
  }

  return (
    <>
      <Box
        w="100%"
        h="200px"
        bgImage={post.image}
        bgSize="cover"
        bgAttachment="fixed"
        bgPos="50% 100%"
        pos="relative"
        bgRepeat="no-repeat"
      />
      <Container maxW={'container.xl'}>
        <Flex py={6}>
          <Flex direction={'column'}>
            <Heading as="h1" size="2xl">
              {post.title}
            </Heading>
            <Text fontSize="md">{post.subtitle}</Text>
          </Flex>
        </Flex>

        <Box borderBottom={'2px'} paddingY={4}>
          Data: {post.date}
        </Box>

        <Box paddingY={4}>{post.short_description}</Box>

        <Box
          paddingY={4}
          dangerouslySetInnerHTML={{ __html: post.long_description }}
        ></Box>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await service.getList()

  // generate the paths
  const paths = data.map((post) => {
    return { params: { slug: post.id } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const data = await service.findById(slug.toString())
  const dataFormat = formatData(data.date)

  const post = {
    ...data,
    date: dataFormat,
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
