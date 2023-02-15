import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { Link as ReactLink} from 'react-router-dom'

export const LandingScreen = () => (
  <Box maxW="8xl" mx="auto" px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }} minH="3xl">
    <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
      <Box
        width={{ lg: 'sm' }}
        transform={{ base: 'translateY(-50%)', lg: 'none' }}
        bg={{ base: useColorModeValue('gray.100', 'gray.700'), lg: 'transparent' }}
        mx={{ base: '4', md: '8', lg: '0' }}
        px={{ base: '2', md: '8', lg: '0' }}
        py={{ base: '3', md: '8', lg: '12' }}
      >
        <Stack spacing={{ base: '8', lg: '10' }}>
          <Stack spacing={{ base: '2', lg: '4' }}>
            <Heading size={{ base: 'lg', md: 'xl'}} color={useColorModeValue('orange.500', 'orange.200')}>
              Chakra Ecom
            </Heading>
            <Heading size={{ base: 'lg', md: 'xl'}}  fontWeight="normal">
              Refresh your wardrobe
            </Heading>
          </Stack>
          <HStack spacing="3">
            <Link as={ReactLink} to='/products' color={useColorModeValue('orange.500', 'orange.200')} fontWeight="bold" fontSize={{ base: 'sm', md: 'lg'}}>
              Discover now
            </Link>
            <Icon color={useColorModeValue('orange.500', 'orange.200')} as={FaArrowRight} />
          </HStack>
        </Stack>
      </Box>
      <Flex flex="1" overflow="hidden">
        <Image
          src="https://www.pcguide.com/wp-content/uploads/2022/06/iphone-14.png"
          alt="Lovely Image"
          fallback={<Skeleton />}
          maxH="450px"
          minW="300px"
          objectFit="cover"
          flex="1"
        />
        
      </Flex>
    </Stack>
  </Box>
)