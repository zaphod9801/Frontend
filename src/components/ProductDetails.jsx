import React, { useState } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, SimpleGrid, HStack,

} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { gql, useQuery, useMutation } from '@apollo/client';
import { ProductItemDetails } from './ProductItemDetails';
import { MenuH } from './Menu';
import { BiCart, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import {getProductItems} from "./ProductsList"



export function ProductDetails() {

    const location = useLocation();
    const { from } = location.state;
    let navigate = useNavigate();
    
    const buyProduct = gql`

    mutation {updateProductItem(updateProductItemInput: {
        id: "${from.id}"
        quantity: ${from.quantity + 1}
    }){
        id
        quantity
    }}
    `
    const [buy] = useMutation(buyProduct, {
        variables: {
            id: from.id,
            quantity: from.quantity + 1
        }, 
        refetchQueries: [{query: getProductItems}],
        onSuccess: navigate('/productos')
    } );

    const deleteProduct = gql`
    mutation {
        removeProductItem(id: "${from.id}"){
          id
        }
      }
    
    `
    const [eliminate] = useMutation(deleteProduct, {
        variables: {
            id: from.id,
        }, 
        refetchQueries: [{query: getProductItems}],
        onSuccess: navigate('/productos')
        
    } );
    
    return (

        <>

            <MenuH />
            <Center>
                <Box bgColor="orange.100" px={10} pb={5} mt={6} mb={5} borderRadius="3xl">
                    <VStack>
                        <Box mb={-4}>
                            <Heading as="h1" size="lg" p={4}>
                                Productos
                            </Heading>
                        </Box>
                        <Box>
                            <div className="scrollable-divP">
                                <Center>
                                    <ProductItemDetails {...from} />
                                </Center>
                            </div>
                            <Box m={3} ml={130}>
                                <HStack spacing="20px">
                                    <Button colorScheme='red' variant='outline' leftIcon={<BiTrash />}  onClick={eliminate}
                                    > Eliminar Producto  </Button>
                                    <Button colorScheme='green' variant='solid' leftIcon={<BiCart />}  onClick={buy}
                                    > Comprar Producto  </Button>
                                </HStack>
                            </Box>
                        </Box >
                    </VStack>
                </Box>
            </Center>


        </>

    )

}