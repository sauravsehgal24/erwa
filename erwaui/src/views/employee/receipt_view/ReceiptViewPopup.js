import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon } from '@chakra-ui/icons';
import { viewReceipt, hideReceipt } from '../../../redux/actions/receiptActions';
import Card from 'components/card/Card';
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
  IconButton
} from '@chakra-ui/react';
const ReceiptViewPopup = () => {
  const dispatch = useDispatch();
  const receiptData = useSelector((state) => state.receipt.receipt);

  if (!receiptData.isViewReceiptActive) return null;

  const handleClose = () => {
    dispatch(hideReceipt());
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg={'rgba(0, 0, 0, 0.8)'}   // Full-screen background
      color="white"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Close Button */}
      <IconButton
        aria-label="Close message"
        icon={<CloseIcon />}
        position="absolute"
        top="20px"
        right="20px"
        size="md"
        onClick={handleClose}
        variant="ghost"
        color="white"
        _hover={{ bg: 'red.500' }}
      />

      {/* Message Content */}
      <Box
        bg="white"
        color="black"
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        maxW="90%"
        maxH="80%"
        overflow="auto"
        textAlign="center"
      >
        <Card style={{width:"70%"}} overflow={'scroll'}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Price ($)</Th>
                    </Tr>
                  </Thead>
                      <Tbody >
                      {receiptData?.items?.map((row, index) => (
                      <Tr key={index}>
                          <Td>
                            <InputGroup>
                            <Input
                              value={row?.description?.value}
                            border={'2px solid'}
                            borderColor="gray.300"
                            disabled
                            />
                            </InputGroup>
                          </Td>
                          <Td>
                          <InputGroup>
                            <Input
                              type="number"
                              value={row?.total_price?.value}
                              id={"item_"+row?.item_index}
                              border={'2px solid'}
                              borderColor="gray.300"
                              disabled
                            />
                            </InputGroup>
                        </Td>
                      </Tr>
                      ))}
                  </Tbody>
                
                </Table>
              </Card>
      </Box>
    </Box>
  );
};

export default ReceiptViewPopup;
