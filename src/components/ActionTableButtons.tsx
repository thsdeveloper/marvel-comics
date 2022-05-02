import { Button, ButtonProps, Stack } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import { useConfirmationModalContext } from '@src/contexts/ModalDialogContext'
import { useContext } from 'react'
import AlertContext from '@src/contexts/AlertContext'
import axios from 'axios'

type DataProps = {
  itemId: string
  model: string
} & ButtonProps

export default function ActionTableButtons({
  itemId,
  model,
  ...props
}: DataProps) {
  const alert = useContext(AlertContext)
  const modalContext = useConfirmationModalContext()

  async function removeHandler(id: string) {
    const { data } = await axios.delete(`/api/${model}/${id}`)
    if (data.success) {
      alert.success('Item excluído com sucesso')
    }
  }

  const handleOnClick = async (id: string) => {
    const result = await modalContext.showConfirmation(
      'Confirma a exclusão do item',
      'Deseja excluir o item selecionado?',
      'Excluir'
    )
    result && (await removeHandler(id))
  }

  return (
    <>
      <Stack direction="row" spacing={4}>
        <Button
          leftIcon={<FaTrash />}
          colorScheme="red"
          variant="ghost"
          size="xs"
          onClick={() => handleOnClick(itemId)}
          {...props}
        >
          Excluir
        </Button>
      </Stack>
    </>
  )
}
