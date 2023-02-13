import { extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
  shadows: { outline: '0 0 0 2px var(--chakra-colors-orange-500)' },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'white',
      }

    }
  }
});

export default theme;
