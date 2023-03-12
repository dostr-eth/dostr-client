export default function (store) {
  store.subscribe(({ type, payload }, state) => {
    switch (type) {
      // these mutations change the state after user manual inputs
      // different from 'setRelays' and 'setFollows', which change the state
      // in bulk and are committed only on startup
      case 'addRelay':
      case 'removeRelay':
      case 'setRelayOpt':
      case 'saveRelays':
      case 'follow':
      case 'unfollow':
      case 'reorderFollows':
        // make an event kind3 and publish it
        store.dispatch('publishContactList')
        break
    }
  })
}
