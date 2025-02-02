import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";
import logoImage from '../../../assets/img/ERWA_processed.png'
// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image src={logoImage} alt="ERWA Logo" h="80%" w="70%" my="1%" />
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
