import HeadingBase from '@src/components/HeadingBase'
import { CgList } from 'react-icons/cg'
import { Box, Container } from '@chakra-ui/react'
import DataTableBase from '@src/components/DataTableBase'
import { TableColumn } from 'react-data-table-component'
import { NewsProps } from '@src/services/noticias'
import * as serviceNews from '@src/services/noticias'
// import AlertContext from '@src/contexts/AlertContext'
import { GetServerSideProps } from 'next'
import { formatData } from '@src/utils/formats'
import ActionTableButtons from '@src/components/ActionTableButtons'
import React from 'react'

export default function Noticias({ posts }) {
  // const alert = useContext(AlertContext)
  // const [news, setNews] = useState<NewsProps[]>([])
  // const [pending, setPending] = useState(true)

  const columns: TableColumn<NewsProps>[] = [
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
      compact: true,
    },
    {
      name: 'Data Publicação',
      selector: (row) => row.date.toString(),
      sortable: true,
      compact: true,
    },
    {
      name: 'Ações',
      cell: (row) => <ActionTableButtons itemId={row.id} model={'blog'} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      compact: true,
    },
  ]

  function handleChangeNews({ selectedRows }) {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected News: ', selectedRows)
  }

  return (
    <>
      <HeadingBase
        label={'Notícias'}
        icon={<CgList />}
        urlButton={'/admin/blog/cadastrar'}
      />
      <Container maxW={'container.xl'}>
        <Box>
          <DataTableBase
            dense
            columns={columns}
            data={posts}
            selectableRows
            onSelectedRowsChange={handleChangeNews}
            theme={'dark'}
          />
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await serviceNews.getList()

  const posts = data.map((item) => {
    return {
      ...item,
      date: formatData(item.date),
    }
  })

  return {
    props: {
      posts,
    },
  }
}
