import { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Container } from '@chakra-ui/layout'
import { formatData } from '@src/utils/formats'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { Heading, Box, Flex, Text, Button } from '@chakra-ui/react'
import { BsCheckCircle } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import Image from 'next/image'
import {
  AgendaProps,
  findById,
  getList,
  subscribeAgenda,
  findSubscription,
  removeSubscription,
} from '@src/services/agenda'
import { useAuth } from '@src/contexts/AuthContext'
import AlertContext from '@src/contexts/AlertContext'

interface DataProps {
  agenda: AgendaProps
}

export default function Agenda({ agenda }: DataProps) {
  const router = useRouter()
  const alert = useContext(AlertContext)
  const { user } = useAuth()
  const { slug } = router.query

  const { isFallback } = useRouter()
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeId, setSubscribeId] = useState<string | null>(null)
  const LeafletMap = dynamic(() => import('@src/components/Map/index'), {
    ssr: false,
  })

  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      if (agenda) {
        await checkSubscribed()
      }
    } catch (err) {
      alert.error('Erro ao carregar notícia')
    } finally {
    }
  }

  // Se a página ainda não foi gerada, isso será exibido
  // inicialmente até getStaticProps() terminar a execução
  if (isFallback) {
    return <Box>Carregando...</Box>
  }

  async function handleSubscribe() {
    const email = user?.email
    if (slug && email) {
      try {
        setIsSubscribing(true)
        await subscribeAgenda(slug.toString(), email)
        await checkSubscribed()
        alert.success(`Presença confirmada na agenda: ${agenda.title}`)
      } catch (err) {
        alert.error('Falha ao confirmar presença na agenda, tente novamente')
        setSubscribeId(null)
      } finally {
        setIsSubscribing(false)
      }
    }
  }

  async function unsubscribe() {
    if (subscribeId) {
      try {
        setIsSubscribing(true)
        const unsubsubscribe = await removeSubscription(subscribeId)
        if (unsubsubscribe) {
          setSubscribeId(null)
          alert.success('Agendamento cancelado com sucesso!')
        }
      } catch (_err) {
        alert.error('Falha ao cancelar presença na agenda, tente novamente')
      } finally {
        setIsSubscribing(false)
      }
    }
  }

  async function checkSubscribed() {
    const email = user?.email
    if (slug && email) {
      try {
        const sId = await findSubscription(slug.toString(), email)
        setSubscribeId(sId.toString())
      } catch (err) {
        setSubscribeId(null)
      }
    }
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-ignore*/}
      <LeafletMap data={agenda} />
      <Container maxW={'container.xl'}>
        <Flex py={6}>
          <Flex direction={'column'}>
            <Heading as="h1" size="2xl">
              {agenda.title}
            </Heading>
            <Text fontSize="md">{agenda.subtitle}</Text>
          </Flex>
        </Flex>
        <Box>
          <Button
            leftIcon={!subscribeId ? <BsCheckCircle /> : <MdOutlineCancel />}
            isLoading={isSubscribing}
            size={'lg'}
            variant={!subscribeId ? 'solid' : 'outline'}
            colorScheme={!subscribeId ? 'green' : 'red'}
            onClick={!!subscribeId ? unsubscribe : handleSubscribe}
          >
            {!subscribeId ? 'Confirmar presença' : 'Cancelar presença'}
          </Button>
        </Box>
        <Box borderBottom={'2px'} paddingY={4}>
          Data: {agenda.date}
        </Box>

        <Box paddingY={4}>{agenda.subtitle}</Box>
        <Box position="relative" width={'100%'} height={450}>
          <Image src={agenda.image} alt={agenda.title} layout="fill" />
        </Box>

        <Box
          paddingY={4}
          dangerouslySetInnerHTML={{ __html: agenda.longDescription }}
        ></Box>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getList()

  // generate the paths
  const paths = data.map((agenda) => {
    return { params: { slug: agenda.id } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const data = await findById(slug.toString())
  const dataFormat = formatData(data.date)

  const agenda = {
    ...data,
    date: dataFormat,
  }

  return {
    props: {
      agenda,
    },
    revalidate: 60,
  }
}
