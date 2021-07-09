import lista from "../../data/data.json";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Text, Stack, Image, Heading, SimpleGrid } from "@chakra-ui/react";

const SOCIAL = {
  facebook: "images/icon-facebook.svg",
  twitter: "images/icon-twitter.svg ",
  youtube: "images/icon-youtube.svg",
  instagram: "images/icon-instagram.svg",
};
const SOCIAL_COLORS = {
  facebook: "facebook.700",
  twitter: "twitter.700",
  youtube: "red.700",
  instagram: "orange.300",
};

function ListMedia() {
  const { colorMode } = useColorMode();

  const convert = (num) => {
    num > 10000 ? (num = num / 10 / 10 / 10 + "K") : (num = num / 1);
    return num;
  };

  if(typeof lista === "undefined" || lista.length === 0){
    return "Esto esta vacio :S"
  }
  return (
    <Box w="70%" maxW="1400px">
      <SimpleGrid minChildWidth="250px" spacingX="40px" spacingY="20px">
        {lista.map((item) => (
          <Box
            key={item.id}
            borderRadius={"5"}
            bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            borderTopWidth={3}
            borderColor={SOCIAL_COLORS[item.social]}
          >
            <Stack spacing={5} p={5}>
              <Stack
                justifyContent="center"
                direction={"row"}
                spacing={2}
                align="center"
              >
                <Image src={SOCIAL[item.social]} p={2}></Image>
                <Text>{item.nick}</Text>
              </Stack>
              <Stack align="center">
                <Heading size={"4xl"}>{convert(item.num)}</Heading>
                <Text>{item.type}</Text>
              </Stack>
              <Stack
                justifyContent="center"
                direction={"row"}
                spacing={1}
                align="center"
              >
                <Image
                  src={
                    item.count > 0
                      ? "images/icon-up.svg"
                      : "images/icon-down.svg"
                  }
                  p={2}
                ></Image>
                <Text color={item.count > 0 ? "green" : "red"}>
                  {item.count > 0 ? item.count : item.count * -1} Today
                </Text>
              </Stack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ListMedia;
