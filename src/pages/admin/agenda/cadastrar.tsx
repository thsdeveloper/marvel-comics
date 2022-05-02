import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '@src/components/TextField'
import HeadingBase from '@src/components/HeadingBase'
import { Box } from '@chakra-ui/react'
import * as serviceAgenda from '@src/services/agenda'
import { useContext } from 'react'
import AlertContext from '@src/contexts/AlertContext'
import { FaCalendar } from 'react-icons/fa'
import { AgendaProps } from '@src/services/agenda'
import UploadModal from '@src/components/UploadModal'

function Cadastrar() {
  const alert = useContext(AlertContext)

  const initialData: AgendaProps = {
    longDescription: '',
    shortDescription: '',
    subtitle: '',
    address: '',
    date: Date.now(),
    geolocation: {
      latitude: '',
      longitude: '',
    },
    image: '',
    title: '',
  }

  function handleSubmit(agenda: AgendaProps) {
    serviceAgenda.setNew(agenda).then((status) => {
      if (status) {
        alert.success('Agenda foi cadastrada com sucesso!')
      }
    })
  }

  return (
    <>
      <HeadingBase label={'Cadastrar Agenda'} icon={<FaCalendar />} />
      <Formik
        initialValues={initialData}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Título da agenda é obrigatório')
            .min(10, 'O campo Título precisa conter 10 carecteres'),
          subtitle: Yup.string()
            .required('Campo subtítulo é obrigatório')
            .min(10, 'Campo subtítulo deve conter pelo menos 10 caracteres'),
          shortDescription: Yup.string().required(
            'O campo descrição menor é obrigatório'
          ),
          longDescription: Yup.string().required(
            'O campo descrição maior é obrigatório'
          ),
          image: Yup.string().required('O campo de imagem url é obrigatório'),
          address: Yup.string().required('O campo de endereço é obrigatório'),
          date: Yup.string().required('O campo data da agenda é obrigatório'),
        })}
        onSubmit={(agenda: AgendaProps, actions) => {
          handleSubmit(agenda)
          actions.resetForm()
        }}
      >
        {(formik) => (
          <Container maxW={'container.xl'}>
            <Box w={'100%'} p={4}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="title"
                  placeholder="Escreva o título da agenda"
                />
                <TextField
                  name="subtitle"
                  placeholder="Escreva o subtitulo da agenda"
                  type="text"
                />
                <TextField
                  name="shortDescription"
                  type="text"
                  placeholder="Descrição curta da agenda"
                />
                <TextField
                  name="longDescription"
                  type="text"
                  textArea={true}
                  placeholder="Descrição longa da agenda"
                />
                <TextField
                  name="image"
                  type="text"
                  placeholder="URL da Imagem"
                />

                <TextField
                  name="address"
                  type="text"
                  placeholder="Endereço da localização"
                />

                <TextField
                  name="geolocation.latitude"
                  type="text"
                  placeholder="Latitude do evento"
                />

                <TextField
                  name="geolocation.longitude"
                  type="text"
                  placeholder="Longitude do evento"
                />

                <TextField
                  name="date"
                  type="text"
                  placeholder="Data do evento"
                />

                <Box paddingTop={5}>
                  <Button
                    type="submit"
                    variant="outline"
                    colorScheme="teal"
                    disabled={!formik.isValid}
                  >
                    Cadastrar agenda
                  </Button>
                  <UploadModal path={'agenda'} />
                </Box>
              </form>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  )
}

export default Cadastrar
