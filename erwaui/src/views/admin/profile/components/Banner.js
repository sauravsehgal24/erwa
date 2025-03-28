// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        name={user.full_name}
        h='87px'
        w='87px'
        bg="#11047A"
        color="white"
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {user.full_name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {user.job}
      </Text>
    </Card>
  );
}
