import { Heading } from '@chakra-ui/layout'
import { Box, Text, Flex } from '@chakra-ui/react'

interface PropsHeadingPage {
  title: string
  subtitle: string
}

const HeadingPage = ({ title, subtitle }: PropsHeadingPage) => {
  return (
    <>
      <Flex>
        <Box p={4}>
          <Heading as="h1" size="lg">
            {title}
          </Heading>
          <Text fontSize="sm">{subtitle}</Text>
        </Box>
      </Flex>
    </>
  )
}

export default HeadingPage
