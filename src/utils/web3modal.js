import { configureChains, createClient } from '@wagmi/core'
import { arbitrum, avalanche, mainnet, polygon, goerli } from '@wagmi/core/chains'
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
//import WalletConnectProvider from "@walletconnect/web3-provider";

// Define constants
//const projectId = process.env.WALLET_CONNECT_PROJECT_ID
const projectId = '58107e13d36d52fd554cd1ece3258891'
const chains = [arbitrum, avalanche, mainnet, polygon, goerli]
//const infuraId = process.env.WALLET_CONNECT_INFURA_ID
/*
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "d3d0d9ca60b04e51b6eb4d0a8e0d518f",
    },
  },
};
*/

// Configure wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  provider,
})

// Create ethereum and modal clients
export const ethereumClient = new EthereumClient(wagmiClient, chains)
export const web3Modal = new Web3Modal(
  {
    projectId,
    themeMode: 'dark',
    themeColor: 'blue',
    themeBackground: 'gradient',
    themeVariables: {
      '--w3m-font-family': 'Spotnik',
      '--w3m-letter-spacing': '-0.5px',
      '--w3m-font-weight': '700',
      '--w3m-font-size': '10px',
    },
  },
  ethereumClient
)
