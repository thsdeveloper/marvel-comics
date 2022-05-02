import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Flex,
  Text,
  Progress,
  Center,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { storage } from '@src/lib/firebase'
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone'
import { uniqueId } from 'lodash'
import filsize from 'filesize'

interface DataProps {
  path: string
}

interface ImageFirebase {
  url: string
  id: string
}

export default function UploadModal({ path }: DataProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [urlImages, setUrlImages] = useState<ImageFirebase[]>([])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
  })

  const files = acceptedFiles.map((file) => {
    const data = {
      ...file,
      id: uniqueId(),
      name: file.name,
      readableSize: filsize(file.size),
      preview: URL.createObjectURL(file),
    }

    return (
      <li key={data.id}>
        {data.name} - {data.readableSize}
      </li>
    )
  })

  async function uploadFiles(): Promise<void> {
    acceptedFiles.map((file) => {
      if (!file) return
      const storageRef = ref(storage, `/${path}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(prog)
        },
        (error) => {
          console.log(error)
          return error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const data = {
              id: uniqueId(),
              url: downloadURL,
            }

            setUrlImages((items) => [data, ...items])
          })
        }
      )
    })
  }

  const RenderDragMessage = () => {
    if (!isDragActive) {
      return (
        <Center width={'100%'}>
          <Text>Coloque seus arquivos aqui...</Text>
        </Center>
      )
    }

    if (isDragReject) {
      return (
        <Center width={'100%'}>
          <Text>Arquivo não suportado</Text>
        </Center>
      )
    }

    return (
      <Center width={'100%'}>
        <Text>Solte os arquivos aqui</Text>
      </Center>
    )
  }

  return (
    <>
      <Button
        onClick={() => onOpen()}
        variant="outline"
      >{`Upload de arquivos`}</Button>
      <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload de arquivos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box py={4}>
              <Text>
                Faça o upload de arquivos para o storage e recupere a URL do
                arquivo para visualização e utilização no projeto.
              </Text>
            </Box>
            <Box>
              <Flex
                {...getRootProps({ className: 'dropzone' })}
                w={'100%'}
                h={150}
                bg={'blackAlpha.300'}
                border={
                  (isDragReject && '2px dotted #C53030') ||
                  (isDragActive && '2px dotted #2F855A')
                }
                borderRadius={5}
              >
                <input {...getInputProps()} />
                <RenderDragMessage />
              </Flex>
            </Box>
            <Box py={4}>
              <Progress hasStripe value={progress} max={100} min={0} />
            </Box>
            <Box>LISTA: {files}</Box>
            <Box>
              <UnorderedList>
                {urlImages.map((image) => (
                  <ListItem key={image.id}>{image.url}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box py={4}>
              <Button
                size="lg"
                leftIcon={<AiOutlineCloudUpload />}
                onClick={uploadFiles}
              >
                Upload
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
