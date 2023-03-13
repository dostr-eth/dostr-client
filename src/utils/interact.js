export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const obj = {
        status: "👆🏽 Enter ENS & click 'NEXT'",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      console.log('❌ Failed to initialise: ' + err.message)
      return {
        address: '',
        status: '❌ Failed to initialise: ' + err.message.toLowerCase(),
      }
    }
  } else {
    return {
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
          status: "👆🏽 Enter ENS & click 'NEXT'",
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
