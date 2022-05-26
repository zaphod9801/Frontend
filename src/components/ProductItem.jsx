import {
    Box, Text, Button, VStack, Image
} from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { randpix, RandpixColorScheme, Symmetry } from 'randpix'

export function ProductItem(product) {

    const generate = randpix({
        size: 8, // Art size. Recommended 7 or 8 (odd/even symmetry) (default: 8)
        scale: 32, // Pixel scale (default: 1)
        symmetry: Symmetry.VERTICAL, // Symmetry (default: VERTICAL)
        color: [Math.floor(Math.random() *256),Math.floor(Math.random() *256),Math.floor(Math.random() *256)], // [R, G, B] like color for solid art (default: undefined),

      })
      
      const art = generate() // Generating the pixel art
      
      const dataURL = art.toDataURL()

    const property = {
        imageUrl: dataURL,
        imageAlt: 'Rear view of modern home with pool',
        title: `${product.product.name}`,
        reviewCount: `${product.quantity}`,
    }

    return (

        <>

            <Link to='/producto' state={{from: {...product, image: dataURL}}} >
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
                        <Box display='flex' mt='2' alignItems='center'>
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {property.reviewCount} unidades
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Link>

        </>


    )

}