// Chakra imports
import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, {useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, ...rest } = props;
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      props.setUploadedFile(acceptedFiles[0]); // Extract file
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  return (
    <Flex
      align='center'
      justify='center'
      bg={bg}
      border='1px dashed'
      borderColor={borderColor}
      borderRadius='16px'
      w='100%'
      h='100%'
      minH='100%'
      cursor='pointer'
      {...getRootProps({ className: "dropzone" })}
      {...rest}>
      <Input variant='main' {...getInputProps()} />
      <Button variant='no-effects'>{content}</Button>
      
    </Flex>
  );
}

export default Dropzone;
