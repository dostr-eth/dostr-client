import { LocalStorage } from 'quasar'

export default function (store) {
  store.subscribe(({ type, payload }, state) => {
    switch (type) {
      case 'setKeys':
        LocalStorage.set('keys', state.keys)
        break
      case 'setUsername':
        LocalStorage.set('username', state.username)
        break
      case 'setWalletModal':
          LocalStorage.set('walletModal', state.walletModal)
          break
      case 'setWalletConnect':
        LocalStorage.set('walletConnect', state.walletConnect)
        break
      case 'setChainId':
        LocalStorage.set('chainId', state.chainId)
        break
      case 'setFollows':
        LocalStorage.set('follows', state.follows)
        break
      case 'setRelays':
        LocalStorage.set('relays', state.relays)
        break
      case 'setConfig':
      case 'setConfigLightningTips':
        LocalStorage.set('config', state.config)
        break
      case 'haveReadNotifications':
        LocalStorage.set('lastNotificationRead', state.lastNotificationRead)
        break
      case 'haveReadMessage':
        LocalStorage.set('lastMessageRead', state.lastMessageRead)
        break
    }
  })
}
