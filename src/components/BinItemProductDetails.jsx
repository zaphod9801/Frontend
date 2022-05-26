import {
    Box, Text, Button, VStack,
} from "@chakra-ui/react";
import { BiDownArrowAlt } from "react-icons/bi";
import { gql, useMutation } from '@apollo/client';
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


export function BinItemProductDetails(product) {
    const [cantidad, setCantidad] = useState(0);

    let navigate = useNavigate();

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
        },
        onSuccess: navigate('/canecas')
    });

    const buying = async () => {

        buy()

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Consumido',
            showConfirmButton: false,
            timer: 1000
        })
    }
    
    const mostartCompra = () => {
        Swal.fire({
            title: 'Consumir',
            text: "Ingresa la cantidad a Consumir",
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Consumir!',
            html: `<input type="text" id="cantidad" class="swal2-input" placeholder="Cantidad">`,
            preConfirm: () => {
                const cant = Swal.getPopup().querySelector('#cantidad').value
                return { cant: cant}
              }
        }).then( async (result) => {
            if (result.isConfirmed) {
                const c = parseInt(result.value.cant);
                console.log(c===10)
                await setCantidad(-c);
                buying();

            }
        })

    }
    

    return (

        <>


                <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px' borderWidth='1px'> 
                    <VStack >
                        <Text fontSize="md" ml={1} mt={3} color="gray.500">
                            {`Te quedan ${product.quantity} unidades de ${product.product.name}`}
                        </Text>
                    </VStack>
                    <Box ml={240}>
                        <Button colorScheme='green' leftIcon={<BiDownArrowAlt />} variant='solid' onClick={mostartCompra} size='sm' > Consumir  </Button>
                    </Box>
                </Box>
        </>


    )

}