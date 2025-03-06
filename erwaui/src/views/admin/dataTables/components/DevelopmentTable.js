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
  Select,
  Button,
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

export default function ExpenseTable({ tableData, setTableData }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const [editingRow, setEditingRow] = React.useState(null);
  const [tempStatus, setTempStatus] = React.useState({});
  const statusOptions = ['Pending', 'In-Review', 'Approved', 'Declined'];

  const handleStatusChange = (rowIndex, newStatus) => {
    setTempStatus((prev) => ({ ...prev, [rowIndex]: newStatus }));
  };

  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
    setTempStatus((prev) => ({ ...prev, [rowIndex]: tableData[rowIndex].status }));
  };

  const handleSaveClick = (rowIndex) => {
    const updatedData = [...tableData];
    updatedData[rowIndex].status = tempStatus[rowIndex];
    setTableData(updatedData);
    setEditingRow(null);
  };

  const handleDeleteClick = (rowIndex) => {
    const updatedData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedData);
  };

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
    columnHelper.accessor('status', {
      id: 'status',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Status</Text>,
      cell: (info) => {
        const rowIndex = info.row.index;
        return (
          editingRow === rowIndex ? (
            <Select
              value={tempStatus[rowIndex] || tableData[rowIndex].status}
              onChange={(e) => handleStatusChange(rowIndex, e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
          ) : (
            <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>
          )
        );
      },
    }),
    columnHelper.accessor('actions', {
      id: 'actions',
      header: () => <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">Actions</Text>,
      cell: (info) => {
        const rowIndex = info.row.index;
        return (
          <Flex gap={2}>
            {editingRow === rowIndex ? (
              <Button size="sm" colorScheme="green" onClick={() => handleSaveClick(rowIndex)}>
                Save
              </Button>
            ) : (
              <Button size="sm" colorScheme="blue" onClick={() => handleEditClick(rowIndex)}>
                Edit
              </Button>
            )}
            <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(rowIndex)}>
              Delete
            </Button>
          </Flex>
        );
      },
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
