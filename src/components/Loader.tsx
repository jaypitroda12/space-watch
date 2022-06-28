import { Box, Spinner } from '@chakra-ui/react'

export const Loader = () => (
  <Box
    position="fixed"
    top="0"
    bottom="0"
    left="0"
    right="0"
    height="100vh"
    width="100vw"
    zIndex="overlay"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundColor="black"
    opacity="0.8"
  >
    <Spinner size="xl" thickness="4px" color="teal" speed='1s' />
  </Box>
)

export default Loader
