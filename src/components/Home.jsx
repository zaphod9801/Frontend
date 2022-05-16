import React, { useState, useEffect } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, HStack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./styles.css";
import { gql, useQuery } from '@apollo/client';
import { NotificationItem } from './NotificationItem';
import { MenuH } from './Menu';
import {BiHomeAlt} from "react-icons/bi";


const getProductItems = gql`{
    productItems(findProductItemInput:{}) {
        id
        product {
          name
        }
        quantity
      }
  }`


export function Home() {

    const [products, setProducts] = useState([]);

    const { loading, error, data } = useQuery(getProductItems, {

        pollInterval: 1,
        onCompleted: (data) => {
            document.title = "Inicio";
            setProducts(data.productItems);

        },
        refetchInterval: 1000
    }
    );


    return (

        <>
            <MenuH />
            <Center>
                <Box bgColor="orange.100" px={10} pb={5} mt={6} borderRadius="3xl">
                    <VStack>
                        <Box mb={-4}>
                            <HStack>
                                <Icon as={BiHomeAlt} color="green" w={10} h={10} mb={2} />
                                <Heading as="h1" size="lg" p={4} color="green"> 
                                    Notificaciones
                                </Heading>
                            </HStack>
                        </Box>
                        <Box>
                            <div className="scrollable-div">
                                <VStack spacing={4}>

                                    {products.map(product => (
                                        <NotificationItem key={product.id} {...product} />
                                    ))}
                                </VStack>

                            </div>
                        </Box >
                    </VStack>
                </Box>
            </Center>

        </>

    )

}