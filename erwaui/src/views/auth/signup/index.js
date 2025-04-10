/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { Navigate, NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/ERWA_processed.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { signUpSchema } from "formValidationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/asyncActions/authAction";
function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();

  const {
    register,
    getValues,
    formState: { errors },
    trigger
  } = useForm({ resolver: yupResolver(signUpSchema) });
  const navigate = useNavigate()
  const handleSignUp = async () => {
    const isValid = await trigger(); 
    if (isValid) {
      const {email, password, confirmPassword, full_name, job} = getValues()
      const result = await dispatch(loginUser(email,password, "REGISTER", full_name, job ))
      navigate("/main/profile")
      console.log(result)
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        textAlign={'center'}
        justifyContent={'center'}
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto' w='100%'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign Up
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <HSeparator />
          </Flex>
          <FormControl>
            <Flex direction='column' textAlign={"left"}
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel><p style={{color:"red"}}>{errors.email?.message}</p>
            <Input
              {...register("email")}
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
            /> 
            </Flex>
            <Flex direction='column' textAlign={"left"}
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Full Name<Text color={brandStars}>*</Text>
            </FormLabel><p style={{color:"red"}}>{errors.full_name?.message}</p>
            <Input
              {...register("full_name")}
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='Samuel Smith'
              mb='24px'
              fontWeight='500'
              size='lg'
            /> 
            </Flex>
            <Flex direction='column' textAlign={"left"}
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Job<Text color={brandStars}>*</Text>
            </FormLabel><p style={{color:"red"}}>{errors.job?.message}</p>
            <Input
              {...register("job")}
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='Software Engineer'
              mb='24px'
              fontWeight='500'
              size='lg'
            /> 
            </Flex>
            <Flex direction='column' textAlign={"left"}
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel><p style={{color:"red"}}>{errors.password?.message}</p>
            <InputGroup size='md'>
              <Input
                {...register("password")}
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 6 characters AlphaNumeric'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            </Flex>
            <Flex direction='column' textAlign={"left"}
                w={{ base: "100%", md: "420px" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel><p style={{color:"red"}}>{errors.confirmPassword?.message}</p>
            <InputGroup size='md'>
              <Input
                {...register("confirmPassword")}
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 6 characters AlphaNumeric'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            </Flex>
              <Button
                onClick={handleSignUp}
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'>
                Sign Up
              </Button>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='start'
                maxW='100%'
                mt='0px'>
                <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Already registered?
                <NavLink to='/auth/sign-in'>
                    <Text
                    color={textColorBrand}
                    as='span'
                    ms='5px'
                    fontWeight='500'>
                     Back to sign-in
                    </Text>
                </NavLink>
                </Text>
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
