import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/layout'
import { Formik, FieldArray } from 'formik'
import { array, object, string } from 'yup'
import TextField from '@src/components/TextField'
import HeadingBase from '@src/components/HeadingBase'
import { Box } from '@chakra-ui/react'
import * as serviceLeaderships from '@src/services/leadership'
import { useContext } from 'react'
import AlertContext from '@src/contexts/AlertContext'
import { RiUserStarLine } from 'react-icons/ri'
import { LeaderProps, LeadershipsProps } from '@src/services/leadership'
import UploadModal from '@src/components/UploadModal'

function Cadastrar() {
  const alert = useContext(AlertContext)

  const leaderProps: LeaderProps = {
    name: 'Nome do Líder da diretoria',
    socialMediaUrl: 'https://www.instagram.com/thspereira_/',
    avatar: 'lkjlkj',
    description: 'thiago@unaadeb.com.br',
  }

  const initialData: LeadershipsProps = {
    title: 'Título da Nova diretoria',
    items: [],
  }

  function handleSubmit(leadership: LeadershipsProps) {
    serviceLeaderships.setNew(leadership).then((status) => {
      if (status) {
        alert.success('Liderança foi cadastrada com sucesso!')
      }
    })
  }

  const validation = object({
    title: string()
      .required('Título do tipo de liderança é obrigatório')
      .min(10, 'O campo Título precisa conter 10 carecteres'),
    items: array(
      object().shape({
        name: string().required('Campo nome é obrigatório'),
        description: string().required('Campo descrição é obrigatório'),
        socialMediaUrl: string().required('Campo url social é obrigatório'),
        avatar: string().required('Campo foto é obrigatório'),
      })
    ).min(1, 'Você precisa fornecer pelo menos uma liderança'),
  })

  return (
    <>
      <HeadingBase label={'Cadastrar Liderança'} icon={<RiUserStarLine />} />
      <Formik
        initialValues={initialData}
        validationSchema={validation}
        onSubmit={(leadership: LeadershipsProps, actions) => {
          handleSubmit(leadership)
          actions.resetForm()
        }}
      >
        {(formik) => (
          <Container maxW={'container.xl'}>
            <Box w={'100%'} p={4}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="title"
                  placeholder="Escreva o título da leadership"
                />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*// @ts-ignore*/}
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <Box>
                      <Box>
                        {formik.values.items.map((_, index) => (
                          <Box
                            key={index}
                            position={'relative'}
                            borderRadius={5}
                            bg={'blue.900'}
                            p={4}
                            my={2}
                          >
                            <TextField
                              name={`items[${index}].name`}
                              placeholder="Escreva o nome do líder"
                              type="text"
                            />
                            <TextField
                              name={`items[${index}].description`}
                              placeholder="Escreva uma descrição sobre o líder"
                              type="text"
                            />
                            <TextField
                              name={`items[${index}].socialMediaUrl`}
                              placeholder="Escreva uma URL da rede social do líder"
                              type="text"
                            />
                            <TextField
                              name={`items[${index}].avatar`}
                              placeholder="Escreva uma URL da foto de perfil"
                              type="text"
                            />
                            <Button
                              top={0}
                              right={0}
                              colorScheme={'red'}
                              disabled={formik.isSubmitting}
                              onClick={() => remove(index)}
                            >
                              Excluir
                            </Button>
                          </Box>
                        ))}
                      </Box>
                      <Box>
                        <Button
                          disabled={formik.isSubmitting}
                          variant="outline"
                          onClick={() => push(leaderProps)}
                        >
                          Adicionar novo líder
                        </Button>
                      </Box>
                    </Box>
                  )}
                </FieldArray>

                <Box paddingTop={5}>
                  <Button
                    type="submit"
                    variant="outline"
                    colorScheme="teal"
                    disabled={!formik.isValid}
                  >
                    Cadastrar leadership
                  </Button>
                  <UploadModal path={'leadership'} />
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
