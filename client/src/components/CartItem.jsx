import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Stack,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";
import { cartItemRemove } from "../redux/slices/cart";

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          h="120px"
          fit="cover"
          src={image}
          alt={image}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="1.5">
            <Text fontWeight="medium">{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        width="full"
        mt={{ base: "4", md: "0" }}
        align={{ base: "center", md: "baseline" }}
        justify="space-between"
      >
        <Select
          maxW="120px"
          focusBorderColor={mode("orange.500", "orange.200")}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {[...Array(stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {" "}
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight="bold">${price}</Text>
        <CloseButton onClick={() => dispatch(cartItemRemove(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
