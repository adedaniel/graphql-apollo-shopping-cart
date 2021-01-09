import {
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  Container,
  Stack,
  Text,
  SimpleGrid,
  Button,
  Image,
  Center,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  HStack,
  IconButton,
  Select,
  CloseButton,
  DrawerFooter,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { FETCH_PRODUCTS_AND_CURRENCIES } from "../graphQL/queries";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CgChevronLeftO } from "react-icons/cg";
import { separateWithComma } from "../utils";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
function Index() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [products, setProducts] = useState([]);
  const { data, error, loading, refetch } = useQuery(
    FETCH_PRODUCTS_AND_CURRENCIES(selectedCurrency)
  );

  useEffect(() => {
    if (data) {
      setProducts(data?.products);
      setCurrencies(data?.currency);
    }
  }, [data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(loading);
  return (
    <Box
      // px="7%"
      bgColor="#e2e6e3"
      minH="100vh"
    >
      <DarkModeSwitch />
      <Flex bg="white" w="full" py={16}>
        <Container maxW="5xl">
          <Stack color="black" spacing={5}>
            <Heading>All Products</Heading>
            <Text fontSize="lg">A 360° look at Lumin</Text>
          </Stack>
        </Container>
      </Flex>
      <Flex w="full" py={12}>
        <Container maxW="5xl">
          <SimpleGrid w="full" columns={[2, 2, 3]} spacingX={10} spacingY={12}>
            {products?.map(({ id, title, price, image_url }) => (
              <Stack key={id} spacing={6}>
                <Center height={48} w="full">
                  <Image boxSize={32} src={image_url} />
                </Center>
                <Stack spacing={0} justify="center" align="center">
                  <Text color="gray.600" textAlign="center" fontSize="sm">
                    {title}
                  </Text>
                  {!loading && (
                    <Text color="black" fontWeight="bold">
                      From {selectedCurrency}{" "}
                      {separateWithComma(price.toFixed(2))}
                    </Text>
                  )}
                </Stack>
                <Flex justify="center">
                  <Button
                    size="lg"
                    colorScheme="primary"
                    color="white"
                    fontSize="sm"
                    fontWeight="normal"
                    w={[32, 40]}
                    rounded={0}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Add to Cart
                  </Button>
                </Flex>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Flex>
      <Drawer placement="right" size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent color="black" bgColor="#f2f3f0">
            <DrawerHeader>
              <HStack justify="space-between" w="full" isInline>
                <IconButton
                  variant="ghost"
                  fontSize="2xl"
                  boxSize={8}
                  minW={6}
                  color="gray.500"
                  onClick={onClose}
                  icon={<CgChevronLeftO />}
                />
                <Text color="gray.500" fontSize="xs">
                  YOUR CART
                </Text>
                <Box />
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                <Flex>
                  <Select
                    value={selectedCurrency}
                    onChange={(event) =>
                      setSelectedCurrency(event.target.value)
                    }
                    w="fit-content"
                    rounded={0}
                    w={24}
                    bg="white"
                    variant="filled"
                  >
                    {currencies?.map((currency, index) => (
                      <option key={index} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Stack spacing={3} bg="white" w="full" px={4} py={3}>
                  <Stack isInline justify="space-between" spacing={8}>
                    <Text fontWeight="bold">Clarifying Body Wash</Text>
                    <CloseButton
                      variant="unstyled"
                      fontSize="sm"
                      boxSize={4}
                      minW={4}
                      // onClick={onClose}
                    />
                  </Stack>
                  <Flex pr={16} justify="flex-end">
                    <Image
                      boxSize={10}
                      src="https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png"
                    />
                  </Flex>
                  <Flex align="center" justify="space-between">
                    <Flex
                      w={32}
                      h={10}
                      bg="white"
                      // border="1px solid"
                      align="center"
                    >
                      <IconButton
                        variant="outline"
                        color="gray.700"
                        borderColor="gray.200"
                        borderRight="none"
                        rounded={0}
                        icon={<AddIcon />}
                      />
                      <Center
                        border="1px solid"
                        borderX="none"
                        borderColor="gray.200"
                        w="full"
                        h="full"
                        bg="white"
                      >
                        <Text fontSize="xl">1</Text>
                      </Center>
                      <IconButton
                        variant="outline"
                        color="gray.700"
                        borderColor="gray.200"
                        borderLeft="none"
                        rounded={0}
                        icon={<MinusIcon />}
                      />
                    </Flex>
                    {!loading && (
                      <Text>
                        {selectedCurrency}{" "}
                        {separateWithComma((29.0).toFixed(2))}
                      </Text>
                    )}
                    <Box />
                  </Flex>
                </Stack>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Stack w="full">
                <Flex
                  w="full"
                  justify="space-between"
                  borderTop="1px solid"
                  borderTopColor="gray.500"
                  py={3}
                >
                  <Text>Subtotal</Text>
                  {!loading && (
                    <Text fontWeight="bold">
                      {selectedCurrency} {separateWithComma((61.0).toFixed(2))}
                    </Text>
                  )}
                </Flex>
                <Button rounded={0} colorScheme="primary" h={12}>
                  PROCEED TO CHECKOUT
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default Index;
