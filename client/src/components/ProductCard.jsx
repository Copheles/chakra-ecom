import {
  Flex,
  Circle,
  Box,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  Image,
  useToast
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

const Rating = ({ rating, numReviews}) =>{
  const [iconSize, setIconSize] = useState('14px');
  return (
    <Flex>
      <HStack spacing='2px'>
        <StarIcon size={iconSize} w='14px' color='orange.500'/>
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? 'orange.500': 'gray.200'}/>
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? 'orange.500': 'gray.200'}/>
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? 'orange.500': 'gray.200'}/>
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? 'orange.500': 'gray.200'}/>
      </HStack>
      <Text fontSize='md' fontWeight='bold' ml='4px'>
        {`${numReviews} ${numReviews === 1 ? 'Review': 'Reviews'}`}
      </Text>
    </Flex>
  )
}

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
  const toast = useToast();

  const cartInfo = useSelector(( state ) => state.cart)
  const {cart} = cartInfo;

  const addItem = (id) => {
    if(cart.some((cartItem) => cartItem.id === id)){
      toast({
        description: 'This item is already in the cart.GO to yout cart to change the amount.',
        status: "warning",
        isClosable: true
      })
    }
    else{
      dispatch(addCartItem(id, 1))
      toast({
        description: "Item has been added.",
        status: 'success',
        isClosable: true
      })
    }
  }


  return (
    <Stack
      p="2"
      spacing="3px"
      bg={useColorModeValue("white", "gray.800")}
      minW="240px"
      h="450px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      {product.productIsNew && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="green.300"
        />
      )}
      {product.stock <= 0 && (
        <Circle
          size="10px"
          position="absolute"
          top={2}
          right={2}
          bg="red.300"
        />
      )}
      <Image src={product.image} alt={product.name} roundedTop="lg" />

      <Box flex="1" maxH="5" alignItems="baseline">
        {product.stock <= 0 && (
          <Badge rounded="full" px={2} fontSize="0.8em" colorScheme="red">
            Sold Out!
          </Badge>
        )}
        {product.productIsNew && (
          <Badge rounded="full" px={2} fontSize="0.8em" colorScheme="green">
            New
          </Badge>
        )}
      </Box>

      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Link
          as={ReactLink}
          to={`/products/${product._id}`}
          pt={2}
          cursor="pointer"
        >
          <Box
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="tight"
            textAlign="center"
            h="70px"
          >
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent="space-between" alignContent="center" py="2">
        <Rating rating={product.rating} numReviews={product.numberOfReviews} />
      </Flex>
      <Flex justify="space-between">
        <Box fontSize="xl" color={useColorModeValue("gray.800", "white")}>
          <Box as="span" color={`gray.600`} fontSize="xl">
            $
          </Box>
          {Number(product.price).toFixed(2)}
        </Box>
        <Tooltip
          label={product.stock <= 0 ? 'Out of Stock': 'Add to cart'}
          bg={product.stock <= 0 ? 'red.400': 'white'}
          placement="top"
          color={product.stock <= 0 ? 'white': "gray.800"}
          fontSize="1.2em"
        >
          <Button
            variant="ghost"
            display="flex"
            isDisabled={product.stock <= 0}
            onClick={() => addItem(product._id)}
          >
            <Icon as={FaShoppingCart} h={7} w={7} alignSelf="center" />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
