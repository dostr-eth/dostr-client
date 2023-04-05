import { configureChains, createClient } from '@wagmi/core'
import {
  arbitrum,
  avalanche,
  mainnet,
  polygon,
  goerli,
} from '@wagmi/core/chains'
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { InfuraProvider } from '@ethersproject/providers'

// Define constants
const projectId = '58107e13d36d52fd554cd1ece3258891' // WalletConnect ID
const infuraId = '2fc78878dee74429b7032a6ed33db36d' // Infure ID
const chains = [arbitrum, avalanche, mainnet, polygon, goerli]
const providerOptions = {
  infura: {
    package: InfuraProvider,
    options: {
      projectId: infuraId,
    },
  },
}

// Configure wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  provider,
})

// Create ethereum and modal clients
export const ethereumClient = new EthereumClient(wagmiClient, chains)
export const ethereumProvider = new InfuraProvider('mainnet', infuraId)
export const web3Modal = new Web3Modal(
  {
    projectId,
    providerOptions,
    cacheProvider: true,
    themeMode: 'dark',
    themeColor: 'blue',
    themeBackground: 'gradient',
    container: '#w3m-container',
    customClasses: {
      container: 'walletConnectModal',
    },
    themeVariables: {
      '--w3m-font-family': 'Spotnik',
      '--w3m-letter-spacing': '-0.5px',
      '--w3m-font-weight': '700',
      '--w3m-font-size': '10px',
    },
  },
  ethereumClient
)
