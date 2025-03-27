import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { viewReceipt, hideReceipt } from '../../../redux/actions/receiptActions';

const ReceiptViewPopup = () => {
  const dispatch = useDispatch();
  const receipt = useSelector((state) => state.receipt.receipt);

  if (!receipt.isViewReceiptActive) return null;

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
        <Text fontSize="xl" fontWeight="bold">{}</Text>
      </Box>
    </Box>
  );
};

export default ReceiptViewPopup;
