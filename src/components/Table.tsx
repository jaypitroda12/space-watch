import {
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useTableInstance,
} from '@tanstack/react-table'
import { Asteroid } from 'interfaces'
import { useMemo, useState } from 'react'

const table = createTable().setRowType<Asteroid>()

export const TableComponent = ({ data }: { data: Asteroid[] }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo(
    () => [
      table.createDataColumn((row) => row.time, {
        id: 'time',
        header: () => <span>Time</span>,
      }),
      table.createDataColumn((row) => row.name, {
        id: 'name',
        header: () => <span>Name</span>,
      }),
      table.createDataColumn((row) => (row.potentialHazard ? 'yes' : 'no'), {
        id: 'potentialHazard',
        header: () => <span>Potential Hazard</span>,
      }),
      table.createDataColumn((row) => row.estimatedDiameter, {
        id: 'estimatedDiameter',
        header: () => <span>Average Estimated Diameter(m)</span>,
      }),
      table.createDataColumn((row) => row.missDistance, {
        id: 'missDistance',
        header: () => <span>Miss Distance(km)</span>,
      }),
      table.createDataColumn((row) => row.velocity, {
        id: 'velocity',
        header: () => <span>Velocity(kmph)</span>,
      }),
      table.createDataColumn((row) => row.personalNote, {
        id: 'personalNote',
        cell: (info) => (
          <Input
            value={localStorage.getItem(info.row.id) || ''}
            onChange={(e) => localStorage.setItem(info.row.id, e.target.value)}
            placeholder="Enter a note"
          ></Input>
        ),
        header: () => <span>Personal Note</span>,
      }),
    ],
    []
  )

  const tableInstance = useTableInstance(table, {
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  })

  return (
    <TableContainer marginTop="30px">
      <Table variant="striped" size="sm">
        <Thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {tableInstance.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <Td key={cell.id}>{cell.renderCell()}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Flex marginTop="30px" gap="10px" whiteSpace="nowrap" alignItems="center">
        <Button
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          {'>'}
        </Button>
        <Button
          onClick={() =>
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
          }
          disabled={!tableInstance.getCanNextPage()}
        >
          {'>>'}
        </Button>
        <Text>Page</Text>
        <Text fontWeight="bold">
          {tableInstance.getState().pagination.pageIndex + 1} of{' '}
          {tableInstance.getPageCount()}
        </Text>
        <Text>| Go to page:</Text>
        <Input
          type="number"
          defaultValue={tableInstance.getState().pagination.pageIndex + 1}
          maxWidth="50px"
          min={1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            tableInstance.setPageIndex(page)
          }}
        />
      </Flex>
    </TableContainer>
  )
}
