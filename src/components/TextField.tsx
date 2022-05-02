import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Textarea } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { Field, FieldHookConfig, useField } from 'formik'

type MyTextInputProps = {
  label?: string
  textArea?: boolean
} & FieldHookConfig<string>

const TextField = ({ label, textArea, ...props }: MyTextInputProps) => {
  const [field, meta] = useField(props)
  return (
    <FormControl isInvalid={meta.error && meta.touched} py={2}>
      {label && <FormLabel>{label}</FormLabel>}
      <Field
        as={textArea ? Textarea : Input}
        {...field}
        {...props}
        type={props.type}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextField
