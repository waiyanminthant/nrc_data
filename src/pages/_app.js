import { Group, AppShell, Navbar, MantineProvider, MediaQuery, useMantineTheme, Footer, Header, Burger, Text, Mark } from '@mantine/core';
import { useState } from 'react';
import NavbarLinks from '../components/navbarlinks';


export default function App({ Component, pageProps }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        primaryColor: 'violet',
        dateFormat: 'DD/MM/YYYY',
        defaultRadius: 'sm',
        fontFamily: 'Roboto'
      }}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 250 }}>
            <NavbarLinks />
          </Navbar>
        }
        footer={
          <Footer height={50} p="md">
            <Text fz='xs'>Coded by BP_STUDIO</Text>
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Group>
                <Text fz='lg'>NRC Checker</Text>
                <Text fz='xs' fw='bolder'>
                  <Mark color='blue' p={5} sx={{borderRadius: 6}}>
                    BP_STUDIO
                  </Mark>
                </Text>
              </Group>
            </div>
          </Header>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  )
}
