'use client';
/* eslint-disable */

import {
  Box,
  Flex,
  Icon,
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
import axios from '../../../../util/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
import { viewReceipt } from '../../../../redux/actions/receiptActions';
import { useDispatch } from 'react-redux';
import { renderSuccessMessage, renderErrMessage } from '../../../../redux/actions/messageAction';
import { MdCancel, MdCheckCircle, MdOutlineError, MdHelpOutline } from 'react-icons/md';

const columnHelper = createColumnHelper();

export default function ExpenseTable({ tableData, set_tableData }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const dispatch = useDispatch();

  const [editingRow, setEditingRow] = React.useState(null);
  const [tempStatus, setTempStatus] = React.useState({});
  const statusOptions = ['Pending', 'In-Review', 'Approved', 'Declined'];

  const handleStatusChange = (rowIndex, newStatus) => {
    setTempStatus((prev) => ({ ...prev, [rowIndex]: newStatus }));
  };

  const handleViewReceipt = (ocr_json)=>{
      dispatch(viewReceipt(ocr_json))
    }

  const handleSaveClick = async (rowIndex) => {
    const expenseId = tableData[rowIndex].expense_id;
    const newStatus = tempStatus[rowIndex];

    try {
      await axios.post('/admin/update_expense_status', {
        expense_id: expenseId,
        status: newStatus,
      });
      
      const updatedData = [...tableData];
      updatedData[rowIndex].status = newStatus;
      set_tableData(updatedData);
      setEditingRow(null);
      dispatch(renderSuccessMessage('Expense status updated successfully'));
    } catch (error) {
      console.error(error);
      dispatch(renderErrMessage('Error updating expense status'));
    }
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
      cell: (info) => <Link onClick={()=>handleViewReceipt(info.row.original.ocr_json)} color="blue.500" isExternal>View</Link>,
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
      header: () => 
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          Status
        </Text>,
      cell: (info) => {
        const rowIndex = info.row.index;
        const currentStatus = tempStatus[rowIndex] || tableData[rowIndex].status;
    
        const statusIcons = {
          Approved: { icon: MdCheckCircle, color: 'green.500' },
          Declined: { icon: MdCancel, color: 'red.500' },
          'In-Review': { icon: MdOutlineError, color: 'orange.500' },
          Default: { icon: MdHelpOutline, color: 'gray.500' },
        };
    
        const { icon, color } = statusIcons[currentStatus] || statusIcons.Default;
    
        return editingRow === rowIndex ? (
          <Select
            value={currentStatus}
            onChange={(e) => handleStatusChange(rowIndex, e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
        ) : (
          <Flex align="center">
            <Icon w="24px" h="24px" me="5px" color={color} as={icon} />
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          </Flex>
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
              <Button size="sm" colorScheme="blue" onClick={() => setEditingRow(rowIndex)}>
                Edit
              </Button>
            )}
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