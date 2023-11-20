'use client'

import { ChakraProvider } from '@chakra-ui/react'

//useContext
import { WorkflowStatusProvider } from '@/constants/workflowStatus';
import { ProposalTableProvider } from '@/constants/proposalTable';
import { VoterTableProvider } from '@/constants/voterTable';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  sepolia,
 hardhat,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

//Header
import NavBar from '@/components/nav-bar/page';
import Voter from './voter/page';
import Footer from '@/components/footer/footer';


const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Voting',
  projectId: '84147b35398a9d0eadf755bec2a5ab93',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider>
            <WorkflowStatusProvider>
              <VoterTableProvider>
              <ProposalTableProvider>
              <NavBar />
              {children}
              <Footer />
              </ProposalTableProvider>
              </VoterTableProvider>
            </WorkflowStatusProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
        </body>
    </html>
  )
}
