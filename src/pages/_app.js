import { MantineProvider } from '@mantine/core';


export default function App({ Component, pageProps }) {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        primaryColor: 'blue',
        dateFormat: 'DD/MM/YYYY',
        defaultRadius: 'sm',
        fontFamily: 'Roboto',
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        }
      }}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
