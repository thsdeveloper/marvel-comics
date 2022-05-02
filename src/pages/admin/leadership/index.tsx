import { Box, Container } from '@chakra-ui/react'
import HeadingBase from '@src/components/HeadingBase'
import { CgList } from 'react-icons/cg'
import DataTableBase from '@src/components/DataTableBase'
import { TableColumn } from 'react-data-table-component'
import ActionTableButtons from '@src/components/ActionTableButtons'
import { GetServerSideProps } from 'next'
import * as service from '@src/services/leadership'
import { LeadershipsProps } from '@src/services/leadership'

export default function Leadership({ leaderships }) {
  const columns: TableColumn<LeadershipsProps>[] = [
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
      compact: true,
    },
    {
      name: 'Ações',
      cell: (row) => (
        <ActionTableButtons itemId={row.id} model={'leadership'} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      compact: true,
    },
  ]
  return (
    <>
      <HeadingBase
        label={'Liderança 2022'}
        icon={<CgList />}
        urlButton={'leadership/cadastrar'}
      />
      <Container maxW={'container.xl'}>
        <Box>
          <DataTableBase
            columns={columns}
            data={leaderships}
            selectableRows
            theme={'dark'}
            dense
          />
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await service.list()

  const leaderships = data.map((leadership) => {
    return {
      ...leadership,
    }
  })

  return {
    props: {
      leaderships,
    },
  }
}
