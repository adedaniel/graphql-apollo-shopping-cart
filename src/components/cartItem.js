import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { separateWithComma } from "../utils";

export default function CartItem({
  item,
  loading,
  selectedCurrency,
  incrementItemAmount,
  decrementItemAmount,
  removeFromCart,
  ...rest
}) {
  const { id, image_url, title, price, amount } = item; // De-structure cart-item details
  return (
    <Stack spacing={3} bg="white" w="full" px={4} py={3} {...rest}>
      <Stack isInline justify="space-between" spacing={8}>
        <Text fontWeight="bold">{title}</Text>
        <CloseButton
          variant="unstyled"
          fontSize="sm"
          boxSize={4}
          minW={4}
          onClick={() => removeFromCart(item)} // Remove Item from cart
        />
      </Stack>
      <Flex pr={16} justify="flex-end">
        <Image boxSize={10} src={image_url} />
      </Flex>
      <Flex align="center" justify="space-between">
        <Flex w={32} h={10} bg="white" align="center">
          <IconButton
            onClick={() => decrementItemAmount(item)} // Reduce number of chosen cart product
            variant="outline"
            color="gray.700"
            borderColor="gray.200"
            borderRight="none"
            rounded={0}
            icon={<MinusIcon />}
          />
          <Center
            border="1px solid"
            borderX="none"
            borderColor="gray.200"
            w="full"
            h="full"
            bg="white"
          >
            <Text fontSize="xl">{amount}</Text>
          </Center>
          <IconButton
            onClick={() => incrementItemAmount(item)} // Increase number of chosen cart product
            variant="outline"
            color="gray.700"
            borderColor="gray.200"
            borderLeft="none"
            rounded={0}
            icon={<AddIcon />}
          />
        </Flex>
        {!loading && ( // Show only when product price is updated with new currency
          <Text>
            {selectedCurrency} {separateWithComma(price.toFixed(2))}
          </Text>
        )}
        <Box />
      </Flex>
    </Stack>
  );
}
