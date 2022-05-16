import {
    Box, Text, Button, VStack, Image
} from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';





export function ProductItemDetails(product) {

    
    
    
    const property = {
        imageUrl: 'https://picsum.photos/500/500',
        imageAlt: 'Rear view of modern home with pool',
        title: `${product.product.name}`,
        formattedPrice: `${product.product.price}`,
        reviewCount: `${product.quantity}`,
        beds: `${product.product.brand.name}`,
    }

    return (

        <>


            <Box maxW='sm' borderWidth='5px' borderRadius='lg' overflow='hidden' bgColor='orange.200' borderColor='orange.200' alignItems='center'>
                <Image src={property.imageUrl} alt={property.imageAlt} />

                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        >
                           Marca: {property.beds} 
                        </Box>
                    </Box>

                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        {property.title}
                    </Box>

                    <Box>
                        {property.formattedPrice}
                        <Box as='span' color='gray.600' fontSize='sm'>
                            / unidad
                        </Box>
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                            {property.reviewCount} unidades
                        </Box>
                    </Box>
                </Box>
            </Box>



        </>


    )

}