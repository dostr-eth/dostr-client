import { ethers } from 'ethers'
//import { SiweMessage } from 'siwe'
import { nip111 } from './nip111/nostr.cjs'
import { ethereumClient } from './web3modal'
//import { SignClient } from '@walletconnect/sign-client'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from './web3.min.js'

export const SignWithWallet = async (username, password, chainId, vueProvider) => {
  if (window.ethereum || ethereumClient.getAccount().isConnected) {
    let provider
    let signer
    let address
    if (window.ethereum && !ethereumClient.getAccount().isConnected) {
      provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log('Browser access detected')
      signer = provider.getSigner()
      let addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      address = ethers.utils.getAddress(addressArray[0])
    }
    if (ethereumClient.getAccount().isConnected) {
      console.log('Injected access detected')
      let infuraId = '2fc78878dee74429b7032a6ed33db36d'
      let providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: infuraId,
          },
        },
      }
      const web3Modal = new Web3Modal({
        providerOptions,
      })
      let connecter = await web3Modal.connect()
      provider = new Web3(connecter)
      signer = provider.eth.personal
      address = ethers.utils.getAddress(ethereumClient.getAccount().address)
    }

    try {
      let info = `eip155:${chainId}:${address}`
      let statement = `Log into Nostr client as '${username}'\n\nIMPORTANT: Please verify the integrity and authenticity of connected Nostr client before signing this message\n\nSIGNED BY: ${info}`
      let signature
      if (window.ethereum && !ethereumClient.getAccount().isConnected) {
        signature = await signer.signMessage(statement)
      }
      if (ethereumClient.getAccount().isConnected) {
        signature = await signer.sign(statement, address)
      }
      let siwe = await nip111.signInWithX(username, info, signature, password)
      return {
        data: siwe,
        status: '🦊 Successfully Generated Schnorr Keys',
      }
    } catch (err) {
      console.log('❌ Failed to Sign: ' + err.message)
      return {
        data: '',
        status: '❌ Failed to Sign: ' + err.message,
      }
    }
  } else {
    return {
      data: '',
      status: '❌ Wallet Not Connected',
    }
  }
}

export const SignWithWalletStandalone = async (username, password, chainId) => {
  if (window.ethereum || ethereumClient.getAccount().isConnected) {
    let provider
    let signer
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log('Browser access detected')
      signer = provider.getSigner()
    } else if (ethereumClient.getAccount().isConnected) {
      console.log('Injected access detected')
      let infuraId = '2fc78878dee74429b7032a6ed33db36d'
      let providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: infuraId,
          },
        },
      }
      const web3Modal = new Web3Modal({
        providerOptions,
      })
      let connecter = await web3Modal.connect()
      provider = new Web3(connecter)
    }

    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      let address = ethers.utils.getAddress(addressArray[0])
      let info = `eip155:${chainId}:${address}`
      let statement = `Log into Nostr client as '${username}'\n\nIMPORTANT: Please verify the integrity and authenticity of connected Nostr client before signing this message\n\nSIGNED BY: ${info}`
      let signature
      if (window.ethereum) {
        signature = await signer.signMessage(statement)
      } else if (ethereumClient.getAccount().isConnected) {
        signer = provider.eth.personal
        let account = ethers.utils.getAddress(ethereumClient.getAccount().address)
        signature = await signer.sign(statement, account)
      }
      let siwe = await nip111.signInWithXStandalone(
        username,
        info,
        signature,
        password
      )
      return {
        data: siwe,
        status: '🦊 Successfully Generated Schnorr Keys',
      }
    } catch (err) {
      console.log('❌ Failed to Sign: ' + err.message)
      return {
        data: '',
        status: '❌ Failed to Sign: ' + err.message,
      }
    }
  } else {
    return {
      data: '',
      status: '❌ Wallet Not Connected',
    }
  }
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const obj = {
        chainId: window.ethereum.networkVersion,
        status: '🦊 Connected',
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      console.log('❌ Failed to initialise: ' + err.message)
      return {
        chainId: '',
        address: '',
        status: '❌ Failed to initialise: ' + err.message,
      }
    }
  } else {
    return {
      chainId: '',
      address: '',
      status:
        "🦊 You must install MetaMask browser extension & connect using 'Connect Wallet' button",
    }
  }
}
