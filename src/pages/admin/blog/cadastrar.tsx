import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '@src/components/TextField'
import HeadingBase from '@src/components/HeadingBase'
import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import * as newsService from '@src/services/noticias'
import AlertContext from '@src/contexts/AlertContext'
import { FaCalendar } from 'react-icons/fa'
import { NewsProps } from '@src/services/noticias'
import HeadingPage from '@src/components/HeadingPage'
import UploadModal from '@src/components/UploadModal'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Editor from '@src/components/CKEditor'

function Cadastrar() {
  const alert = useContext(AlertContext)
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const initialData: NewsProps = {
    title: '',
    subtitle: '',
    short_description: '',
    long_description: '',
    date: Date.now(),
    image: '',
  }

  async function handleSubmit(post: NewsProps) {
    const dados: NewsProps = {
      ...post,
    }
    newsService.setNew(dados).then((status) => {
      if (status) {
        alert.success('Artigo cadastrado com sucesso!')
      }
    })
  }

  const yupValidation = Yup.object({
    title: Yup.string()
      .required('Título do post é obrigatório')
      .min(10, 'O campo Título precisa conter 10 carecteres'),
    subtitle: Yup.string()
      .required('Campo subtítulo é obrigatório')
      .min(10, 'Campo subtítulo deve conter pelo menos 10 caracteres'),
    short_description: Yup.string().required(
      'O campo descrição menor é obrigatório'
    ),
    long_description: Yup.string().required('O campo conteúdo é obrigatório'),
    image: Yup.string().required('O campo de imagem é obrigatório'),
  })

  return (
    <>
      <HeadingBase label={'Novo artigo'} icon={<FaCalendar />} />
      <Container maxW={'container.xl'}>
        <HeadingPage
          title={'Cadastrar novo artigo'}
          subtitle={
            'Cadastre um novo artigo, notícia ou informativo para a página do blog'
          }
        />
      </Container>
      <Formik
        initialValues={initialData}
        validationSchema={yupValidation}
        onSubmit={(post: NewsProps, actions) => {
          handleSubmit(post)
          actions.resetForm()
        }}
      >
        {(formik) => (
          <Container maxW={'container.xl'}>
            <Box w={'100%'} p={4}>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <TextField
                    name="title"
                    placeholder="Escreva o título da postagem"
                  />
                </Box>
                <Box>
                  <TextField
                    name="subtitle"
                    placeholder="Escreva o subtitulo da postagem"
                    type="text"
                  />
                </Box>

                <Box>
                  <TextField
                    name="short_description"
                    type="text"
                    placeholder="Descrição curta da post"
                  />
                </Box>
                <Box>
                  <Editor
                    name="long_description"
                    onChange={(data) => {
                      formik.setFieldValue('long_description', data)
                    }}
                    editorLoaded={editorLoaded}
                    value={''}
                  />
                </Box>
                <Box>
                  <TextField
                    name="image"
                    type="text"
                    placeholder="URL da Imagem"
                  />
                </Box>
                <Box>
                  <UploadModal path={'blog'} />
                </Box>
                <Box></Box>
                <Box paddingTop={5}>
                  <Button
                    type="submit"
                    variant="outline"
                    colorScheme="teal"
                    disabled={!formik.isValid}
                  >
                    Cadastrar post
                  </Button>
                  <UploadModal path={'blog'} />
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
