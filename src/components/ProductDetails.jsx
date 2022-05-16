import React, { useState } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, SimpleGrid, HStack, Select

} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { gql, useQuery, useMutation } from '@apollo/client';
import { ProductItemDetails } from './ProductItemDetails';
import { MenuH } from './Menu';
import { BiCart, BiTrash, BiBasket } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { getProductItems } from "./ProductsList"



export const getProviders = gql`{
    productProviders(findProductProviderInput:{}){
        id
        name
      }
  }`

export function ProductDetails() {
    const [providers, setProviders] = useState([]);

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
        refetchQueries: [{ query: getProductItems }],
    });

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
        refetchQueries: [{ query: getProductItems }],
        onSuccess: navigate('/productos')

    });

    const { loading, error, data } = useQuery(getProviders, {

        pollInterval: 1,
        onCompleted: (data) => {
            setProviders(data.productProviders);
        },
        refetchInterval: 1000
    }

    );

    return (

        <>

            <MenuH />
            <Center>
                <Box bgColor="orange.100" px={10} pb={5} mt={6} mb={5} borderRadius="3xl">
                    <VStack>
                        <Box mb={-4}>
                            <HStack>
                                <Icon as={BiBasket} color="green" w={10} h={10} mb={2} />
                                <Heading as="h1" size="lg" p={4} color="green">
                                    Productos
                                </Heading>
                            </HStack>
                        </Box>
                        <Box>
                            <div className="scrollable-divP">
                                <Center>
                                    <ProductItemDetails {...from} />
                                </Center>
                            </div>
                            <Box m={3} ml={130}>
                                <VStack spacing={4}>
                                    <Select placeholder='Proveedor' bg='rgba(56,161,105,255);' color="white" w="414px" >


                                        {providers.map(provider => (
                                            <option value={provider.id}> {provider.name} </option>
                                        ))}
                                    </Select>

                                    <HStack spacing="20px">
                                        <Button colorScheme='red' variant='outline' leftIcon={<BiTrash />} onClick={eliminate}
                                        > Eliminar Producto  </Button>
                                        <Button colorScheme='green' variant='solid' leftIcon={<BiCart />} onClick={buy}
                                        > Comprar Producto  </Button>
                                    </HStack>
                                </VStack>
                            </Box>
                        </Box >
                    </VStack>
                </Box>
            </Center>


        </>

    )

}