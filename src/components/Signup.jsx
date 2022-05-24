import React, { useState, useEffect, useRef } from "react";
import {
    Heading, Center, Icon, Spacer, Input, Box, Flex, Grid, VStack, StackDivider, Button, InputGroup, InputRightElement,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { BiCaretUpCircle, BiLeftArrowAlt } from "react-icons/bi";
import * as API from "../services/getInfo";
import { gql, useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2'
import {  useNavigate  } from "react-router-dom";

const API_URL = "http://localhost:3002";

const createUser = gql`

    mutation create($firstName: String!, $lastName: String!, $email: String!, $password: String!){
    
      create(fistName: $firstName, lastName: $lastName, email: $email, password: $password) {
      
      id
      }
    
    }

`;



export function Signup() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()


    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [mutateUsers, { data, loading, error }] = useMutation(createUser);
    let navigate = useNavigate()




    const onSubmit = async (values) => {
        
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })
            
        });
        if (response.ok) {
            const jwt = await response.text();
            localStorage.setItem('token', jwt);
            console.log(jwt);

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1000
              })
            
              navigate('/');
              
        } else {
            console.log(response.status);
            console.log(await response.text());
            
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Error en el registro, por favor revisa los campos',
                showConfirmButton: false,
                timer: 1500
              })
        }
    };

    useEffect(() => {
        document.title = "Registro"
    }, []);

    return (

        <>
            <Link to={`/`} >
                <Button colorScheme='green' variant='outline' ml={5} mt={3} >  Ingreso </Button>
            </Link>
            
            <Center>
                <Box bgColor="orange.100" px={10} pb={5} mt={6} borderRadius="3xl">
                    <VStack>
                        <Icon as={BiCaretUpCircle} color="green.400" w={10} h={10} mt={4} />
                        <Box>
                            <Heading as="h1" size="lg" p={4}>
                                Registro Nimu
                            </Heading>
                        </Box>
                        <Box p='4'>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <VStack divider={<StackDivider borderColor='gray.200' />}
                                    spacing={4}
                                    align='stretch'>

                                    <Input
                                        id='firstName'
                                        variant='filled'
                                        placeholder="Nombre"
                                        bgColor="green.100"
                                        required
                                        _placeholder={{ color: 'black' }}
                                        htmlSize={30}
                                        width='auto'
                                        {...register('firstName', {
                                            required: 'Requerido',
                                        })}
                                    />



                                    <Input
                                        id='lastName'
                                        variant='filled'
                                        bgColor="green.100"
                                        placeholder="Apellido"
                                        required
                                        _placeholder={{ color: 'black' }}
                                        htmlSize={30}
                                        width='auto'
                                        {...register('lastName', {
                                            required: 'Requerido',
                                        })}
                                    />



                                    <Input
                                        id='email'
                                        variant='filled'
                                        bgColor="green.100"
                                        placeholder="Email"
                                        required
                                        _placeholder={{ color: 'black' }}
                                        htmlSize={30}
                                        width='auto'

                                        {...register('email', {
                                            required: 'Requerido',
                                        })}
                                    />



                                    <InputGroup size='md'>
                                        <Input
                                            id='password'
                                            variant='filled'
                                            htmlSize={30}
                                            width='auto'
                                            bgColor="green.100"
                                            required
                                            type={show ? 'text' : 'password'}
                                            placeholder='Contraseña'
                                            _placeholder={{ color: 'black' }}
                                            {...register('password', {
                                                required: 'Requerido',
                                            })}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' bgColor="green.200" onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>



                                    <Button colorScheme='green' variant='solid'
                                        type='submit' isLoading={isSubmitting}> Registrarse  </Button>
                                </VStack>
                            </form>
                        </Box>
                    </VStack>
                </Box>
            </Center>

        </>

    )

}