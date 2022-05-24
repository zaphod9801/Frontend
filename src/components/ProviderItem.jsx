import {
    Box, Text,VStack,
} from "@chakra-ui/react";




export function ProviderItem(provider) {


    return (

        <>



            <Box bgColor="orange.100" px={10} pb={2} borderRadius="3xl" w='400px' borderWidth='1px'>
                <VStack >
                    <Text fontSize="md" mt={3} color="gray.500">
                        {`Proveedor: ${provider.name}`}
                    </Text>
                </VStack>
            </Box>



        </>


    )

}