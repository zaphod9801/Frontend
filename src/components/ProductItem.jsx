import {
    Box, Text, Button, VStack, Image
} from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

export function ProductItem(product) {

    const property = {
        imageUrl: 'https://picsum.photos/500/500',
        imageAlt: 'Rear view of modern home with pool',
        title: `${product.product.name}`,
    }

    return (

        <>

            <Link to='/producto' state={{ from: product }} >
                <Box maxW='sm' borderWidth='5px' borderRadius='lg' overflow='hidden' bgColor='orange.200' borderColor='orange.200' alignItems='center'>
                    <Image src={property.imageUrl} alt={property.imageAlt} borderRadius='xl' />

                    <Box p='6'>

                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={1}
                        >
                            {property.title}
                        </Box>
                    </Box>
                </Box>

            </Link>

        </>


    )

}