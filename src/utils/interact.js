import { ethers } from 'ethers'
import { nipxx } from './nipxx/nostr.cjs'

export const SignWithWallet = async (username, password, chainId) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      let info = `eip155:${chainId}:${addressArray[0]}`
      let message = `👋 You are connecting to Nostr network via Dostr as ${username?.length > 0 ? '\'' + username + '\'' : 'anonymous user'}\n\n⚠️ Important: Please verify the integrity and authenticity of your Nostr client before signing this message\n\n📤 Payload: ${info}`
      let signature = await signer.signMessage(message)
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
