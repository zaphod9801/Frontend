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
import { BiTrash } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai"
import { getThings } from "./BinList";
import Swal from 'sweetalert2'


export function BinItem({ caneca, products }) {

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

    const mostartAlert = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras una caneca",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(products);
                eliminate();

                Swal.fire(
                    'Eliminado!',
                    'La caneca ha sido eliminada.',
                    'success'
                )
            }
        })

    }



    return (

        <>

            <Center>

                <Box maxW='sm' overflow='hidden' bgColor="orange.100" pb={2} borderRadius="3xl" borderWidth='1px' width="200px">
                    <VStack>
                        <Text key={caneca.id} fontSize="md" m={3} mt={6} color="gray.500"> {caneca.name}</Text>
                        <Link to='/caneca' state={{ from: { ...caneca, products: products } }} >
                            <Box  >
                                <Button colorScheme='green' variant='solid' size='sm' leftIcon={<AiFillEye />} > Ver productos  </Button>
                            </Box>
                        </Link>
                        <Box  >
                            <Button colorScheme='red' variant='outline' size='sm' leftIcon={<BiTrash />} onClick={mostartAlert} pr={7}  pl={7}  > Eliminar  </Button>
                        </Box>
                    </VStack>
                </Box>

            </Center>


        </>


    )


}