import { ethers } from 'ethers'
//import { SiweMessage } from 'siwe'
import { nipxx } from './nipxx/nostr.cjs'

export const SignWithWallet = async (username, password, chainId) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      let address = addressArray[0]
      /*
      const domain = window.location.host
      const origin = window.location.origin
      */
      let info = `eip155:${chainId}:${address}`
      let statement = `Log into Nostr client as '${username}'\n\nIMPORTANT: Please verify the integrity and authenticity of connected Nostr client before signing this message\n\nSIGNED BY: ${info}`
      /*
      const message = new SiweMessage({
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: chainId,
      }).prepareMessage()
      */
      let signature = await signer.signMessage(statement)
      let siwe = await nipxx.signInWithX(username, info, signature, password)
      return {
        data: siwe,
        status: '🦊 Successfully Generated Schnorr Keys'
      }
    } catch (err) {
      console.log('❌ Failed to Sign: ' + err.message)
      return {
        data: '',
        status: '❌ Failed to Sign: ' + err.message.toLowerCase(),
      }
    }
  } else {
    return {
      data: '',
      status: '❌ Wallet Not Connected'
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
        status: '❌ Failed to initialise: ' + err.message.toLowerCase(),
      }
    }
  } else {
    return {
      chainId: '',
      address: '',
      status: "🦊 You must install MetaMask browser extension & connect using 'Connect Wallet' button",
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '🦊 Connected',
        }
      } else {
        return {
          address: '',
          status: "🦊 Connect to MetaMask using 'Connect Wallet' button",
        }
      }
    } catch (err) {
      return {
        address: '',
        status: '❌ ' + err.message.toLowerCase(),
      }
    }
  } else {
    return {
      address: '',
      status: "🦊 You must install MetaMask browser extension & connect using 'Connect Wallet' button",
    }
  }
}
