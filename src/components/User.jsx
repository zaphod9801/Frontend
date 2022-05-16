import React, { useState } from "react";
import {
  Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement, Text, SimpleGrid, HStack, List, ListItem, Select
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./styles.css";
import { gql, useQuery, useMutation } from '@apollo/client';
import { ProviderItem } from './ProviderItem';
import { MenuH } from './Menu';
import { BiUser } from "react-icons/bi";


export const getMe = gql`{
  me {
    id
    firstName
    lastName
    email
  }
  productProviders(findProductProviderInput:{}){
    id
    name
  }
  }`



export function User() {

  const [me, setMe] = useState({});
  const [providers, setProviders] = useState([]);

  const { loading, error, data } = useQuery(getMe, {

    pollInterval: 1,
    onCompleted: (data) => {
      document.title = "Perfil";
      setMe(data.me);
      setProviders(data.productProviders);
    },
    refetchInterval: 1000
  }

  );



  return (

    <>

      <MenuH />
      <Center>
        <Box bgColor="orange.100" px={10} pb={5} mt={6} mb={5} w='400px' borderRadius="3xl" >
          <VStack>
            <Box mb={-4}>
              <HStack>
                <Icon as={BiUser} color="green" w={10} h={10} mb={2} />
                <Heading as="h1" size="lg" p={4} color="green">
                  Perfil
                </Heading>
              </HStack>
            </Box>
            <Center>
              <Box>
                <div className="scrollable-divC">
                  <List spacing={4}>

                    <ListItem>
                      <Text fontSize="xl" color="gray.500">
                        Nombre: <strong>{me.firstName}</strong>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="xl" color="gray.500">
                        Apellido: <strong>{me.lastName}</strong>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="xl" color="gray.500">
                        Correo: <strong>{me.email}</strong>
                      </Text>
                    </ListItem>
                  </List>
                </div>
                <Box >
                  <div className="scrollable-divC">
                    <VStack spacing={4}>

                      {providers.map(provider => (
                        <ProviderItem key={provider.id} {...provider} />
                      ))}
                    </VStack>

                  </div>
                </Box>
              </Box >
            </Center>
          </VStack>
        </Box>
      </Center>
    </>

  )

}