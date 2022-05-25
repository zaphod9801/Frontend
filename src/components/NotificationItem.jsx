import {
    Box, Text, Button, VStack,
} from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import { gql, useMutation } from '@apollo/client';
import React, { useState } from "react";



export function NotificationItem(product) {
    const [cantidad, setCantidad] = useState(0);


    const buyProduct = gql`

        mutation {updateProductItem(updateProductItemInput: {
            id: "${product.id}"
            quantity: ${product.quantity + cantidad}
        }){
            id
            quantity
        }}
        `
    const [buy] = useMutation(buyProduct, {
        variables: {
            id: product.id,
            quantity: product.quantity + cantidad
        }
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
    
    const mostartCompra = () => {
        Swal.fire({
            title: 'Compra',
            text: "Ingresa la cantidad a comprar",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar!',
            html: `<input type="text" id="cantidad" class="swal2-input" placeholder="Cantidad">`,
            preConfirm: () => {
                const cant = Swal.getPopup().querySelector('#cantidad').value
                return { cant: cant}
              }
        }).then( async (result) => {
            if (result.isConfirmed) {
                const c = parseInt(result.value.cant);
                console.log(c===10)
                await setCantidad(c);
                buying();

            }
        })

    }

    return (

        <>


            {product.quantity === 0 ?
                <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px' borderWidth='1px'>
                    <VStack >
                        <Text fontSize="md" ml={1} mt={3} color="gray.500">
                            {`Te quedaste sin ${product.name}, deberías comprar ahora!`}
                        </Text>
                    </VStack>
                    <Box ml={240}>
                        <Button colorScheme='green' leftIcon={<BiCart />} variant='solid' onClick={mostartCompra} size='sm' > Comprar  </Button>
                    </Box>
                </Box>
                : product.quantity < 41 ?

                    <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px' >
                        <VStack >
                            <Text fontSize="md" ml={1} mt={3} color="gray.500">
                                {`Te quedan ${product.quantity} unidades de ${product.product.name}, apurate a comprar!`}
                            </Text>
                        </VStack>
                        <Box ml={240}>
                            <Button colorScheme='green' leftIcon={<BiCart />} variant='solid' onClick={mostartCompra} size='sm' > Comprar  </Button>
                        </Box>
                    </Box>

                    : product.quantity > 40 ?

                        <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px'>
                            <Text fontSize="md" ml={1} mt={3} color="gray.500">
                                {`Aun te quedan ${product.quantity} unidades de ${product.product.name}`}
                            </Text>
                        </Box>
                        : null


            }



        </>


    )

}