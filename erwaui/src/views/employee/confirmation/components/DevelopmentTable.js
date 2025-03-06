'use client';
/* eslint-disable */

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';

const columnHelper = createColumnHelper();

export default function ExpenseTable(props) {
  const { tableData } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  

  const columns = [
    columnHelper.accessor('expense_id', {
      id: 'expense_id',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Expense ID</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('full_name', {
      id: 'full_name',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Full Name</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Email</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('amount', {
      id: 'amount',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Amount ($)</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">${info.getValue()}</Text>,
    }),
    columnHelper.accessor('file_url', {
      id: 'file_url',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Receipt</Text>,
      cell: (info) => <Link href={info.getValue()} color="blue.500" isExternal>View</Link>,
    }),
    columnHelper.accessor('submitted_date', {
      id: 'submitted_date',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Submitted Date</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{new Date(info.getValue()).toLocaleDateString()}</Text>,
    }),
    columnHelper.accessor('updated_date', {
      id: 'updated_date',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Updated Date</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{new Date(info.getValue()).toLocaleDateString()}</Text>,
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Status</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('approved_by', {
      id: 'approved_by',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Approved By</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue() || 'N/A'}</Text>,
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Expense Table
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} borderColor={borderColor}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} borderColor="transparent">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
