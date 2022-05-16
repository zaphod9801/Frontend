import React, { useState } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, SimpleGrid, HStack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./styles.css";
import { gql, useMutation } from '@apollo/client';
import {BiTrash } from "react-icons/bi";
import {getThings} from "./BinList";


export function BinItem(caneca) {

    const deleteBin = gql`
    mutation {
        removeSmartBin (id: "${caneca.id}"){
          id
        }
      }
    
    `
    const [eliminate] = useMutation(deleteBin, {
        variables: {
            id: caneca.id,
        },
        refetchQueries: [{ query: getThings }],

    });
    return (

        <>

            <Center>
                <Box bgColor="orange.100" pb={2} borderRadius="3xl" w='300px' borderWidth='1px'>
                    <VStack>
                        <Text key={caneca.id} fontSize="md" mr={110} mt={3} color="gray.500"> {caneca.name}</Text>
                    </VStack>
                    <Box ml={165}>
                        <Button colorScheme='red' variant='outline' size='sm' leftIcon={<BiTrash />} onClick={eliminate}> Eliminar  </Button>
                    </Box>
                </Box>
            </Center>


        </>


    )


}