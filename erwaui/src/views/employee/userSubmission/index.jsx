'use client';
/* eslint-disable */

import {
  Box,
  Button,
  Flex,
  Input,
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
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';

export default function ExpenseTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    amount: '',
    file_url: '',
    sub_total: '',
    taxes: '',
    total: '',
  });
  
  const [tableData, setTableData] = React.useState([
    { id: 1, item_name: 'Item 1', rate: 10, quantity: 2, amount: 20 },
    { id: 2, item_name: 'Item 2', rate: 15, quantity: 1, amount: 15 },
    { id: 3, item_name: 'Item 3', rate: 8, quantity: 3, amount: 24 },
  ]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file_url: URL.createObjectURL(file) });
    }
  };
  
  const handleTableChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    updatedData[index]['amount'] = updatedData[index]['rate'] * updatedData[index]['quantity'];
    setTableData(updatedData);
  };

  const handleDeleteRow = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  const handleClear = () => {
    setFormData({ full_name: '', email: '', amount: '', file_url: '', sub_total: '', taxes: '', total: '' });
  };
  
  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700">Expense Table</Text>
        <Menu />
      </Flex>
      <Box px="25px" mb="8px">
        <Input placeholder="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} mb="4" />
        <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} mb="4" />
        <Input placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} mb="4" />
        <Input type="file" onChange={handleFileUpload} mb="4" />
        <Input placeholder="Sub-Total" name="sub_total" value={formData.sub_total} onChange={handleChange} mb="4" />
        <Input placeholder="Taxes" name="taxes" value={formData.taxes} onChange={handleChange} mb="4" />
        <Input placeholder="Total" name="total" value={formData.total} onChange={handleChange} mb="4" />
        <Button colorScheme="blue" onClick={() => alert('Form submitted!')} mr="4">Submit</Button>
        <Button colorScheme="red" onClick={handleClear}>Clear</Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Item Name</Th>
            <Th>Rate</Th>
            <Th>Quantity</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, index) => (
            <Tr key={row.id}>
              <Td>
                <Input
                  value={row.item_name}
                  onChange={(e) => handleTableChange(index, 'item_name', e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleTableChange(index, 'rate', parseFloat(e.target.value) || 0)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleTableChange(index, 'quantity', parseInt(e.target.value) || 0)}
                />
              </Td>
              <Td>
                <Text fontWeight="700">${row.amount}</Text>
              </Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleDeleteRow(index)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}
