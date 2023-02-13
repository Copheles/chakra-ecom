import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";

export const Footer = () => (
  <Box w="100%" bg={useColorModeValue("gray.100", "gray.900")}>
    <Container as="footer" role="contentinfo" maxW="8xl">
      <Stack
        spacing="8"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        py={{ base: "12", md: "16" }}
      >
        <Stack spacing={{ base: "6", md: "8" }} align="start">
          <Flex alignContent="center">
            <Icon
              as={AiFillThunderbolt}
              fontSize="30px"
              color={useColorModeValue("orange.400", "orange.600")}
            ></Icon>
            <Text fontSize='xl' fontWeight='extrabold'>Chakra Ecom</Text>
          </Flex>
          <Text color="muted">Create beautiful websites remarkably fast.</Text>
        </Stack>
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">How it works</Button>
                <Button variant="link">Pricing</Button>
                <Button variant="link">Use Cases</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              maxW={{ lg: "360px" }}
            >
              <Input
                placeholder="Enter your email"
                type="email"
                required
                variant="flushed"
              />
              <Button
                variant="outline"
                px={7}
                py={2}
                type="submit"
                colorScheme="orange"
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Copheles, Inc. All rights
          reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);
