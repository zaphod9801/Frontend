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
import { MenuH } from './Menu';
import { useForm } from 'react-hook-form';
import { FaPlus } from "react-icons/fa";
import { BiCart, BiTrash } from "react-icons/bi";
import { BinItem } from "./BinItem.";


export const getThings = gql`{
    smartBins (findSmartBinInput: {}){
        name
        id
      }
  }`



export function BinList() {

    const [user, setUser] = useState({});
    const [canecas, setCanecas] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("");

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const { loading, error, data } = useQuery(getThings, {

        pollInterval: 1,
        onCompleted: (data) => {
            document.title = "Canecas";
            setUser(data.me);
            setCanecas(data.smartBins);
        },
        refetchInterval: 1000
    }

    );


    const createSmartBin = gql`
    mutation {
        createSmartBin(createSmartBinInput: {name: "${name}"}) {
          name
          id
        }
        }
    
    `


    const [create] = useMutation(createSmartBin, {
        variables: {
            name: `${name}`
        }
    });
    const onSubmit = async (values) => {
        create();
        window.location.reload(false);

    };
    

    return (

        <>

            <MenuH />
            <Center>
                <Box bgColor="orange.100" px={10} pb={5} mt={6} mb={5} w='400px' borderRadius="3xl">

                    <VStack>
                        <Box mb={-4}>
                            <Heading as="h1" size="lg" p={4}>
                                Canecas
                            </Heading>
                        </Box>
                        <Center>
                            <Box>
                                <div className="scrollable-div">
                                    <SimpleGrid spacing={4} columns={1}>

                                        {canecas.map(caneca => (
                                            <BinItem key={caneca.id} {...caneca} />
                                        ))}

                                    </SimpleGrid>
                                </div>
                                <Box m={3} ml={150}>
                                    <Button colorScheme='green' variant='solid' onClick={onOpen} leftIcon={<FaPlus />}
                                    > Agregar Caneca  </Button>
                                </Box>
                            </Box >
                        </Center>
                    </VStack>

                </Box>
            </Center>


            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={name}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Crear nueva caneca
                    </DrawerHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DrawerBody>

                            <VStack divider={<StackDivider borderColor='gray.200' />}
                                spacing={4}
                                align='stretch'>



                                <Input
                                    id='idProduct'
                                    variant='filled'
                                    bgColor="green.100"
                                    placeholder="Nombre Caneca"
                                    _placeholder={{ color: 'black' }}
                                    htmlSize={30}
                                    width='auto'
                                    value={name}
                                    onChange={(data) => setName(data.target.value)}
                                />
                            </VStack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth='1px'>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='green' variant='solid'
                                type='submit' isLoading={isSubmitting}> Crear  </Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>

    )

}