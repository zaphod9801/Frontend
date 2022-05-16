import {
    Box, Text, Button, VStack,
} from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import { gql, useMutation } from '@apollo/client';



export function NotificationItem(product) {


    const buyProduct = gql`

        mutation {updateProductItem(updateProductItemInput: {
            id: "${product.id}"
            quantity: ${product.quantity + 1}
        }){
            id
            quantity
        }}
        `
    const [buy] = useMutation(buyProduct, {
        variables: {
            id: product.id,
            quantity: product.quantity + 1
        }
    });

    return (

        <>


            {product.quantity === 0 ?
                <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='500px' borderWidth='1px'>
                    <VStack >
                        <Text fontSize="md" ml={1} mt={3} color="gray.500">
                            {`Te quedaste sin ${product.name}, deberías comprar ahora!`}
                        </Text>
                    </VStack>
                    <Box ml={320}>
                        <Button colorScheme='green' leftIcon={<BiCart />} variant='solid' onClick={buy} size='sm' > Comprar  </Button>
                    </Box>
                </Box>
                : product.quantity < 41 ?

                    <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='500px' >
                        <VStack >
                            <Text fontSize="md" ml={1} mt={3} color="gray.500">
                                {`Te quedan ${product.quantity} unidades de ${product.product.name}, apurate a comprar!`}
                            </Text>
                        </VStack>
                        <Box ml={320}>
                            <Button colorScheme='green' leftIcon={<BiCart />} variant='solid' onClick={buy} size='sm' > Comprar  </Button>
                        </Box>
                    </Box>

                    : product.quantity > 40 ?

                        <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='500px'>
                            <Text fontSize="md" ml={1} mt={3} color="gray.500">
                                {`Aun te quedan ${product.quantity} unidades de ${product.product.name}`}
                            </Text>
                        </Box>
                        : null


            }



        </>


    )

}