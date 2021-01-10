import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CgChevronLeftO } from "react-icons/cg";
import { separateWithComma } from "../utils";
import CartItem from "./cartItem";

export default function Cart({
  isOpen,
  onClose,
  loading,
  selectedCurrency,
  setSelectedCurrency,
  currencies,
  cart,
  getSubTotal,
  removeFromCart,
  incrementItemAmount,
  decrementItemAmount,
}) {
  return (
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
                  // Set selected currency from list of currencies
                  onChange={(event) => setSelectedCurrency(event.target.value)}
                  w="fit-content"
                  rounded={0}
                  w={24}
                  bg="white"
                  variant="filled"
                >
                  {currencies?.map((currency, index) => (
                    // Map Currencies to display in select options
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
              </Flex>
              {cart.map((item) => (
                // Map each item in the cart into the CartItem component
                <CartItem
                  key={item.id}
                  item={item}
                  loading={loading}
                  selectedCurrency={selectedCurrency}
                  incrementItemAmount={incrementItemAmount}
                  decrementItemAmount={decrementItemAmount}
                  removeFromCart={removeFromCart}
                />
              ))}
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
                {!loading && ( // Show the subtotal when updated with selected currency
                  <Text fontWeight="bold">
                    {selectedCurrency}{" "}
                    {separateWithComma(getSubTotal().toFixed(2))}
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
  );
}
