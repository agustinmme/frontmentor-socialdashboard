import lista from "../../data/data.json";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Text,
  Stack,
  Image,
  Heading,
  Flex,
  Spacer,
  SimpleGrid,
  popperCSSVars,
} from "@chakra-ui/react";


const SOCIAL_VALUE = {
    "Page views": "images/icon-facebook.svg",
    LikesF: "images/icon-facebook.svg",
    Retweets: "images/icon-twitter.svg ",
    LikesT: "images/icon-twitter.svg ",
    LikesY: "images/icon-youtube.svg",
    "Total Views": "images/icon-youtube.svg",
    "Profile Views": "images/icon-instagram.svg",
    LikesI: "images/icon-instagram.svg"
  };

function ListToday() {
  const { colorMode } = useColorMode();
  
  const convert = (num) => {
    num>10000?num=(((num/10)/10)/10)+"K":num=num/1
    return num;
  }

  return (
    <Box w="70%" maxW="1400px">
      <Heading m={5}>Overview - Today</Heading>
      <SimpleGrid minChildWidth="250px" spacingX="40px" spacingY="20px">
        {lista.map((item) =>
          item.red.map((item) => (
            <Box
              key={item.title}
              borderRadius={"5"}
              bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            >
              <Stack p={5}>
                <Flex align="center">
                  <Text>{(item.title).slice(0, -1)}</Text>
                  <Spacer />
                  <Image src={SOCIAL_VALUE[item.title]} p={5}></Image>
                </Flex>
                <Flex align="baseline">
                  <Heading>{convert(item.num)}</Heading>
                  <Spacer />
                  <Image
                    src={
                      item.rating > 0
                        ? "images/icon-up.svg"
                        : "images/icon-down.svg"
                    }
                    p={2}
                    mt={-2}
                  />
                  <Text color={item.rating > 0 ? "green" : "red"}>
                    {item.rating > 0 ? item.rating : item.rating * -1}%
                  </Text>
                </Flex>
              </Stack>
            </Box>
          ))
        )}
      </SimpleGrid>
    </Box>
  );
}

export default ListToday;
