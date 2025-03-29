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
  FormControl,
  Spinner,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { MdEdit, MdUpload } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import React, {useEffect, useState} from 'react';
import Dropzone from "views/admin/profile/components/Dropzone";
import api from 'util/api'
import { renderSuccessMessage, renderErrMessage } from '../../../redux/actions/messageAction';
import { addReceipt } from '../../../redux/actions/receiptActions';
export default function ExpenseTable(props) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
   const { used, total, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const brandColor = useColorModeValue("brand.500", "white");
    const textColorSecondary = "gray.400";

    const [isExtractingExpense, setIsExtractingExpense] = useState(false)

  const [amounts, setAmounts] = useState({
    sub_total: '',
    taxes: '',
    total: '',
  });
  
  const [receiptData, setReceiptData] = useState([]);
  
  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setAmounts({ ...amounts, [name]: value });
  };

  const [uploadedFile, setUploadedFile] = useState();

  const handleSubmission = () =>{
    if(receiptData && (amounts.sub_total || amounts.total)){
      const data = {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        file_url:"",
        amount: amounts.total ? amounts.total : amounts.sub_total,
        ocr_json: JSON.stringify(receiptData)
      }
      api.post("/user/submit_expense", data, {
        headers: {
          'Content-Type': 'application/json'
        }})
      .then(res=>{
        dispatch(renderSuccessMessage("Expense Submitted!"))
      }).catch(err=>{
        dispatch(renderErrMessage("Internal Error Submitting!"))
      })
      
    }else{
      dispatch(renderErrMessage("Receipt Data not entered correctly!"))
    }
  }
  const handleFileUpload = () => {
    if (uploadedFile && uploadedFile.name) {
      setReceiptData([])
      setAmounts({
        sub_total: '',
        taxes: '',
        total: '',
      })
      const formData = new FormData();
      formData.append('receipt', uploadedFile);
      setIsExtractingExpense(true)
      api.post("/ocr/upload_and_analyze", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res=>{
        console.log(res.data)
        if(res.data.length !== 0){
          const data = res.data[0]
          setIsExtractingExpense(false)
          setReceiptData(data)
          setAmounts({...amounts, total:data.total?.value,sub_total:data.subtotal?.value,taxes:data.tax?.value})
        }
      }).catch(err=>{
        console.log(err)
        dispatch(renderErrMessage("Error Extracting Receipt Data"))
        setIsExtractingExpense(false)
      })
    }
  };

  useEffect(()=>{
    handleFileUpload()
  },[uploadedFile])

  const Loader = (props)=>{
    const message = props.message
    return (
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Spinner size={'xl'} color='blue'/>
          <Text
            color={textColor} fontSize="20px" fontWeight="700" lineHeight="100%" mt={'5'}>
            {message}
          </Text>
      </Box>
    )
  }

  const handleReceiptData = (e,index,type)=>{
    console.log(e.target.value)
    console.log("in handle change")
    console.log(receiptData)
    let newData = {...receiptData}
      newData.items[index] = {
        ...newData.items[index], [type]:{
          "value":e.target.value
        }
      }
    setReceiptData(newData)
  } 
  
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
            <Input type="number" placeholder="Sub-Total" name="sub_total" value={amounts.sub_total} onChange={handleAmountChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
            <Input type="number" placeholder="Taxes" name="taxes" value={amounts.taxes} onChange={handleAmountChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
            <Input type="number" placeholder="Total" name="total" value={amounts.total} onChange={handleAmountChange} mb="2" width={'80%'} border={'1px solid #e2d0f7'}/>
            <Button colorScheme="blue" onClick={() => handleSubmission()}  width={'80%'} borderRadius={7}>Submit</Button>
        </Card>
          <Card style={{width:"70%"}} overflow={'scroll'}>
            <Flex px="25px" mb="30px" justifyContent="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                  Extracted Receipt Data
                </Text>
              </Flex>
              {receiptData.length==0 ?
              <Box display={'flex'} justifyContent={'center'} alignContent={'center'} mt={'10%'}>
                { isExtractingExpense?
                <Loader message="Extracting Receipt Data ..." />:
                <Text
                color={textColor} fontSize="30px" fontWeight="700" lineHeight="100%"
                >Extracted data from the receipt will be displayed here</Text>
                }
              </Box>:
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Item</Th>
                        <Th>Price ($)</Th>
                        {/* <Th>Quantity</Th>
                        <Th>Amount</Th> */}
                      </Tr>
                    </Thead>
                        <Tbody >
                        {receiptData?.items?.map((row, index) => (
                        <Tr key={index}>
                            <Td>
                              <InputGroup>
                              <InputLeftElement
                                  pointerEvents="none"  
                                  children={<MdEdit />}
                                />
                              <Input
                                value={row?.description?.value || ""}
                              border={'2px solid'}
                              borderColor="gray.300"
                              onChange={(e)=>handleReceiptData(e, index, "description")}
                              />
                              </InputGroup>
                            </Td>
                            <Td>
                            <InputGroup>
                              <InputLeftElement
                                  pointerEvents="none"  
                                  children={<MdEdit />}
                                />
                              <Input
                                type="number"
                                value={row?.total_price?.value || ""}
                                id={"item_"+row?.item_index}
                                border={'2px solid'}
                                borderColor="gray.300"
                                onChange={(e)=>handleReceiptData(e, index, "total_price")}
                              />
                              </InputGroup>
                          </Td>
                            {/* <Td>
                            <Input
                              type="number"
                              value={row.quantity}
                              onChange={(e) => handleTableChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            />
                          </Td> 
                          <Td
                          onClick={()=>handelFocus("item_"+row?.item_index)}>
                               <Text fontWeight="700">${row.amount}</Text> 
                              <IconButton
                                icon={<MdEdit />}
                              >
                              </IconButton>
                            </Td>*/}
                        </Tr>
                        ))}
                    </Tbody>
                  
                  </Table>
                }
              
      </Card>
    </Box>
  );
}
