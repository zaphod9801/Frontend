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
import { gql, useQuery, useMutation } from '@apollo/client';
import { ProductItem } from './ProductItem';
import { MenuH } from './Menu';
import { useForm } from 'react-hook-form';
import { FaPlus } from "react-icons/fa";
import { BiBasket } from "react-icons/bi";
import { Navbar } from './Navbar';


export const getProductItems = gql`{
    productItems(findProductItemInput:{}) {
        id
        product {
          name
          brand {
            name
          }
          price
        }
        
        quantity
      }
  }`



export function ProductList() {

    const [products, setProducts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [idProduct, setIdProduct] = useState("");

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const { loading, error, data } = useQuery(getProductItems, {

        pollInterval: 1,
        onCompleted: (data) => {
            document.title = "Productos";
            setProducts(data.productItems);
            console.log(products)
        },
        refetchInterval: 1000
    }

    );

    const createProductItem = gql`
    mutation {
        createProductItem(createProductItemInput: 
          {
                quantity: 0,
                productLot: "melo",
                productId: "${idProduct}",
          }) {
          
          id
          quantity
        }
      }
    
    `


    const [create] = useMutation(createProductItem, {
        variables: {
            productId: `${idProduct}`,
            quantity: 0,
            productLot: "melo",
        },
        refetchQueries: [{ query: getProductItems }],
    });
    const onSubmit = async (values) => {

        console.log(idProduct);
        create();

    };

    const onSubmits = async (values) => {


        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Producto agregado',
            showConfirmButton: false,
            timer: 1000
        })

        create();
        onClose();
    };

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
                                    <div className="scrollable-div">
                                        <SimpleGrid spacing={5} columns={[1, 2, 3]}>

                                            {products.map(product => (
                                                <ProductItem key={product.id} {...product} />
                                            ))}
                                        </SimpleGrid>
                                    </div>
                                    <Box m={3} ml={4}>
                                        <Button colorScheme='green' variant='solid' onClick={onOpen} leftIcon={<FaPlus />}
                                        > Agregar Producto  </Button>
                                    </Box>
                                </Box >
                            </VStack>
                        </div>


                    </Box>

                </div>

                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    initialFocusRef={idProduct}
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth='1px'>
                            Crear nuevo producto
                        </DrawerHeader>

                        <form onSubmit={handleSubmit(onSubmits)}>
                            <DrawerBody>

                                <VStack divider={<StackDivider borderColor='gray.200' />}
                                    spacing={4}
                                    align='stretch'>



                                    <Input
                                        id='idProduct'
                                        variant='filled'
                                        bgColor="green.100"
                                        placeholder="Id"

                                        _placeholder={{ color: 'black' }}
                                        htmlSize={30}
                                        width='auto'
                                        value={idProduct}
                                        onChange={(data) => setIdProduct(data.target.value)}
                                    />
                                </VStack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme='green' variant='solid'
                                    type='submit' isLoading={isSubmitting} > Crear  </Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </Drawer>
            </div>
        </>

    )

}