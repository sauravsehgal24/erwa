import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { hideMessage } from '../../redux/actions/messageAction';

const MessagePopUp = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.appMessage);

  useEffect(() => {
    if (true) {
      const timer = setTimeout(() => {
        dispatch(hideMessage());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message.active, dispatch]);

  if (!message.active) return null;

  const handleClose = () => {
    dispatch(hideMessage());
  };

  return (
    <Box
      position="fixed"
      top="20px"
      right="20px"
      bg={message.color || 'blue.500'}
      color="black"
      p={4}
      borderRadius="md"
      boxShadow="lg"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      minW="300px"
    >
      <Text>{message.message}</Text>
      <IconButton
        aria-label="Close message"
        icon={<CloseIcon />}
        size="sm"
        ml={4}
        onClick={handleClose}
        variant="outline"
        colorScheme="purple"
      />
    </Box>
  );
};

export default MessagePopUp;
