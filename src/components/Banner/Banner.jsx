import lista from '../../data/data.json'
import { Box, Text, Stack, Heading,Flex,Spacer,Switch } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
function Banner() {

    const numeros = lista.map(item=>{
        return item.num 
    })
    
    let suma = 0
    numeros.forEach(num => {
        suma += num ;
    });
    const {  toggleColorMode } = useColorMode();

    return (
        <Box w="70%" maxW="1400px">
        <Flex p={10}>
        <Stack >
          <Heading>Social Media Dashboard</Heading>
          <Text>Total Followers: {suma}</Text>
        </Stack>
        <Spacer />
        <Switch colorScheme="teal" onChange={toggleColorMode} size="lg" />
      </Flex>
      </Box>
    )
}

export default Banner
