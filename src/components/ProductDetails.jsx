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

    const buying = async () => {

        buy()

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Compra exitosa',
            showConfirmButton: false,
            timer: 1000
        })
    }

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

    const back = () => {
        onSuccess: navigate('/productos')
        navigate('/productos');
    }

    const mostartAlert = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Eliminaras un producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                eliminate();

                Swal.fire(
                    'Eliminado!',
                    'El producto se ha sido eliminada.',
                    'success'
                )
            }
        })

    }

    return (

        <>
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Box bgColor="white" px={10} pb={5} mt={1} mb={5} borderRadius="3xl">
                        <MenuH />
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
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
                                    <Box >
                                        <VStack spacing={4}>
                                            <Select placeholder='Proveedor' bg='rgba(56,161,105,255);' color="white" w="414px" >


                                                {providers.map(provider => (
                                                    <option value={provider.id}> {provider.name} </option>
                                                ))}
                                            </Select>

                                            <HStack spacing="20px">
                                                <Button colorScheme='red' variant='outline' onClick={back}
                                                > Cancelar  </Button>
                                                <Button colorScheme='red' variant='outline' leftIcon={<BiTrash />} onClick={mostartAlert}
                                                > Eliminar Producto  </Button>
                                                <Button colorScheme='green' variant='solid' leftIcon={<BiCart />} onClick={buying}
                                                > Comprar Producto  </Button>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                </Box >
                            </VStack>
                        </div>
                    </Box>
                </div>
            </div>
        </>

    )

}