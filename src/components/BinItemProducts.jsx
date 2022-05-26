import React, { useState, useEffect } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, HStack
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { gql, useQuery } from '@apollo/client';
import { NotificationItem } from './NotificationItem';
import { MenuH } from './Menu';
import { Navbar } from "./Navbar";
import { BiCylinder } from "react-icons/bi";
import { BinItemProductDetails } from './BinItemProductDetails';

export function BinItemProducts() {

    const location = useLocation();
    const { from } = location.state;




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
                                        <Icon as={BiCylinder} color="green" w={10} h={10} mb={2} />
                                        <Heading as="h1" size="lg" p={4} color="green">
                                            Productos en {from.name}
                                        </Heading>
                                    </HStack>
                                </Box>
                                <Box>
                                    <div className="scrollable-divC">
                                        <VStack spacing={4}>
                                            {from.products.length === 0 ?

                                                <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px' borderWidth='1px'>
                                                    <VStack >
                                                        <Text fontSize="md" ml={1} mt={3} color="gray.500">
                                                            {`Esta caneca no tiene productos`}
                                                        </Text>
                                                    </VStack>
                                                </Box>
                                                :


                                                from.products.map(product => (
                                                    <BinItemProductDetails key={product.id} {...product} />
                                                ))

                                            }
                                        </VStack>

                                    </div>
                                </Box >
                            </VStack>
                        </div>
                    </Box>

                </div>
            </div>
        </>

    )

}