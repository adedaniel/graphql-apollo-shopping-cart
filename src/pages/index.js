import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cart from "../components/cart";
import ProductListItem from "../components/productListItem";
import { FETCH_PRODUCTS_AND_CURRENCIES } from "../graphQL/queries";

function Index() {
  const [products, setProducts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading } = useQuery(
    FETCH_PRODUCTS_AND_CURRENCIES(selectedCurrency)
  );

  useEffect(() => {
    if (data) {
      setProducts(data?.products);
      setCurrencies(data?.currency);
    }
  }, [data]);

  const addToCart = (chosenItem) => {
    const productToIncrement = [...cart].find(({ id }) => id === chosenItem.id);

    if (productToIncrement) {
      incrementItemAmount(chosenItem);
    } else {
      setCart([...cart, { ...chosenItem, amount: 1 }]);
    }
  };

  const incrementItemAmount = (chosenItem) => {
    setCart(
      cart.map((item) =>
        item.id === chosenItem.id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrementItemAmount = (chosenItem) => {
    const productToDecrement = [...cart].find(({ id }) => id === chosenItem.id);

    if (productToDecrement.amount > 1) {
      setCart(
        cart.map((item) =>
          item.id === chosenItem.id
            ? { ...item, amount: item.amount - 1 }
            : item
        )
      );
    } else {
      removeFromCart(chosenItem);
    }
  };

  const removeFromCart = (chosenItem) => {
    setCart([...cart].filter(({ id }) => id !== chosenItem.id));
  };

  const getSubTotal = () => {
    return cart.reduce((sum, { price, amount }) => sum + price * amount, 0);
  };

  useEffect(() => {
    const cartWithUpdatedPrices = cart.map((eachItem) => {
      const itemInProductList = [...products].find(
        ({ id }) => id === eachItem.id
      );
      return { ...eachItem, ...itemInProductList };
    });
    setCart(cartWithUpdatedPrices);
  }, [products]);

  return (
    <Box bgColor="#e2e6e3" minH="100vh">
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
            {products?.map((product) => (
              <ProductListItem
                product={product}
                key={product.id}
                loading={loading}
                onOpen={onOpen}
                selectedCurrency={selectedCurrency}
                addToCart={addToCart}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Flex>
      <Cart
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={currencies}
        cart={cart}
        removeFromCart={removeFromCart}
        incrementItemAmount={incrementItemAmount}
        decrementItemAmount={decrementItemAmount}
        getSubTotal={getSubTotal}
      />
    </Box>
  );
}

export default Index;
