import { Button, Center, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { separateWithComma } from "../utils";
// Display each Product item
export default function ProductListItem({
  product,
  loading,
  onOpen,
  selectedCurrency,
  addToCart,
  ...rest
}) {
  const { id, image_url, title, price } = product;

  const submitProductToCart = () => {
    // When clicked, add product to cart and open cart drawer
    addToCart(product);
    onOpen();
  };

  return (
    <Stack key={id} spacing={6} {...rest}>
      <Center height={48} w="full">
        <Image boxSize={32} src={image_url} />
      </Center>
      <Stack spacing={0} justify="center" align="center">
        <Text color="gray.600" textAlign="center" fontSize="sm">
          {title}
        </Text>
        {!loading && ( // Show only when product price is updated with new currency
          <Text color="black" fontWeight="bold">
            From {selectedCurrency} {separateWithComma(price.toFixed(2))}
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
          onClick={submitProductToCart}
        >
          Add to Cart
        </Button>
      </Flex>
    </Stack>
  );
}
