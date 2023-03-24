import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { RouterTransition } from './NavigationProgress';
import { Notifications } from '@mantine/notifications';

const AppWrapper = ({children}: {children: ReactNode}) => {
  const { chains, provider } = configureChains(
    [goerli],
    [
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })
  
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colors: {
              'primary': [
                '#d3dedd',
                '#bdcdcb',
                '#a7bdba',
                '#92aca9',
                '#7c9b98',
                '#668b87',
                '#245953',
                '#20504b',
                '#1d4742',
                '#193e3a',
              ]
            },
            primaryColor: 'primary'
          }}
        >
           <Notifications />
          <RouterTransition />
          {children}
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>

  );
}

export default AppWrapper;