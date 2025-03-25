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
  Icon,
  Tr,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { MdUpload } from "react-icons/md";
import React, {useState} from 'react';
import Dropzone from "views/admin/profile/components/Dropzone";

export default function ExpenseTable(props) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  
   const { used, total, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const brandColor = useColorModeValue("brand.500", "white");
    const textColorSecondary = "gray.400";

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
    { item_name: 'Item 1', rate: 10, quantity: 2, amount: 20 },
    { item_name: 'Item 2', rate: 15, quantity: 1, amount: 15 },
    { item_name: 'Item 3', rate: 8, quantity: 3, amount: 24 },
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

  const handleClear = () => {
    setFormData({ full_name: '', email: '', amount: '', file_url: '', sub_total: '', taxes: '', total: '' });
  };

  const [uploadedFile, setUploadedFile] = useState();
  
  return (
    <Box flexDirection={'row'} padding={'2%'} display={'flex'} pt={{ base: "130px", md: "80px", xl: "80px" }} style={{height:"500px"}}>

<Card  mb='20px' align='center' style={{marginRight:"2%",alignItems: 'center',height:"100%", width:"30%"}}  p='20px' >
      <Flex h='100%' style={{marginBottom:'2%'}}direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          maxH={{ base: "100%", lg: "100%", "2xl": "100%" }}
          minH={{ base: "100%", lg: "100%", "2xl": "100%" }}
          setUploadedFile={setUploadedFile}
          content={
            <Box>
              <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
              <Flex justify='center' mx='auto' mb='12px'>
                <Text fontSize='xl' fontWeight='700' color={brandColor}>
                  Upload Recipt
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                PNG, JPG and PDF files are allowed
              </Text>
              {uploadedFile && <Text fontSize='xs'>File: {uploadedFile.name}</Text>}
            </Box>
          }
        />
        
      </Flex>
        <Input placeholder="Sub-Total" name="sub_total" value={formData.sub_total} onChange={handleChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
        <Input placeholder="Taxes" name="taxes" value={formData.taxes} onChange={handleChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
        <Input placeholder="Total" name="total" value={formData.total} onChange={handleChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
          <Button colorScheme="blue" onClick={() => alert('Form submitted!')}  width={'80%'}>Submit</Button>
          <Button colorScheme="red" mt='1' onClick={handleClear} width={'80%'}>Clear</Button>
    </Card>
          <Card style={{width:"70%"}}>
            <Flex px="25px" mb="30px" justifyContent="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                  Extracted Expense
                </Text>
              </Flex>
       <Table variant="simple">
         <Thead>
           <Tr>
             <Th>Item Name</Th>
             <Th>Rate</Th>
             <Th>Quantity</Th>
             <Th>Amount</Th>
           </Tr>
         </Thead>
         <Tbody>
           {tableData.map((row, index) => (
            <Tr key={index}>
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
            </Tr>
           ))}
       </Tbody>
      </Table>
      </Card>
    </Box>
  );
}
