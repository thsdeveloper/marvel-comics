import { Box, Container } from '@chakra-ui/react'
import { AgendaProps } from '@src/services/agenda'
import HeadingBase from '@src/components/HeadingBase'
import { CgList } from 'react-icons/cg'
import DataTableBase from '@src/components/DataTableBase'
import { TableColumn } from 'react-data-table-component'
import ActionTableButtons from '@src/components/ActionTableButtons'
import { GetServerSideProps } from 'next'
import * as service from '@src/services/agenda'
import { formatData } from '@src/utils/formats'

export default function Agenda({ agendas }) {
  function handleChange({ selectedRows }) {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows)
  }

  const columns: TableColumn<AgendaProps>[] = [
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
      compact: true,
    },
    {
      name: 'Ações',
      cell: (row) => <ActionTableButtons itemId={row.id} model={'agenda'} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      compact: true,
    },
  ]
  return (
    <>
      <HeadingBase
        label={'Agendas e eventos'}
        icon={<CgList />}
        urlButton={'agenda/cadastrar'}
      />
      <Container maxW={'container.xl'}>
        <Box>
          <DataTableBase
            columns={columns}
            data={agendas}
            selectableRows
            onSelectedRowsChange={handleChange}
            theme={'dark'}
            dense
          />
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await service.getList()

  const agendas = data.map((agenda) => {
    return {
      ...agenda,
      date: formatData(agenda.date),
    }
  })

  return {
    props: {
      agendas,
    },
  }
}
