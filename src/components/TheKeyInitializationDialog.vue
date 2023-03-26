<template>
  <!-- <q-dialog persistent> -->
  <!-- <div v-if="showKeyInitialization"> -->
  <q-card class="relative-position full-width" style="overflow-x: hidden;">
    <div style="width: 30%; display: flex; margin: 0 auto">
      <img src="mascot_round.png" alt="mascot_round" class="image-fit" />
    </div>
    <q-btn icon="close" size="md" flat round class="absolute-top-right z-top" @click="$emit('look-around')" />
    <h2 style="text-align: center; justify-content: center; margin-bottom: -30px; font-size: 16px;" class="text-h4 spotnik">
      Welcome to
    </h2>
    <h1 style="text-align: center; justify-content: center; margin-bottom: -5px; font-size: 50px;" class="text-h4 spotnik">
      Dostr
    </h1>
    <h2 style="text-align: center; justify-content: center; font-size: 16px;" class="text-h6 spotnik">
      Ethereum-flavoured Nostr
    </h2>
    <q-expansion-item expand-icon="expand_more" expanded-icon="expand_less" class="intro full-width items-center q-mb-md"
      header-class="items-center">
      <template #header>
        <span class="text-bold flex justify-between" style="margin: 0 auto">
          <q-icon name="info"></q-icon>
          <span class="lt-md" style="font-size: 14px; margin: -3px 0 0 8px;">Learn about Dostr</span>
          <span class="gt-sm" style="font-size: 14px; margin: -4px 0 0 10px;">Click here to learn about Dostr</span>
        </span>
      </template>
      <div>
        <BaseInformation />
      </div>
      <div style="margin-top: 5px">
        <span style="
                    padding: 0.2rem 0 0 0.2rem;
                    font-size: 10pt;
                    font-family: 'SF Mono';
                    letter-spacing: -0.5px;
                  ">ℹ️ This same information can be found in the
          <strong>FAQ</strong> section at the bottom of the
          <strong>Settings</strong> page after Login</span>
      </div>
    </q-expansion-item>
    <hr style="margin-bottom: 25px" />
    <div style="display: flex; margin: 0; justify-content: center" class="q-mb-md" v-if="!isConnected">
      <div style="width: 4%; display: flex; margin-right: 5px">
        <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
      </div>
      <q-btn size="md" @click="siwe" style="
                  background: linear-gradient(266deg, rgba(0,148,21,0.75) 0%, rgba(0,113,205,0.75) 100%);
                  border: 0px solid white;
                " text-color="white" font-weight="900" :label="!isConnected ? 'Connect Ethereum Wallet' : 'Wallet Connected'"
        value="true" />
      <div style="width: 4%; display: flex; margin-left: 5px">
        <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
      </div>
    </div>
    <div style="display: flex; margin: 0; justify-content: center" class="q-mb-md" v-if="isConnected">
      <div style="width: 4%; display: flex; margin-right: 5px">
        <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
      </div>
      <q-btn size="md" @click="disconnect" style="
                  background: linear-gradient(266deg, rgba(255,90,90,0.75) 0%, rgba(205,0,0,0.75) 100%);
                  border: 0px solid white;
                " text-color="white" font-weight="900" :label="!isConnected ? 'Connect Ethereum Wallet' : 'Disconnect Wallet'"
        value="true" />
      <div style="width: 4%; display: flex; margin-left: 5px">
        <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
      </div>
    </div>
    <div v-if="isConnected" style="position: relative;">
      <div class="input-siwe" style="margin: 0px auto;">
        <q-input v-model="password" ref="keyInput" bottom-slots outlined label='enter password (optional)' dense>
          <q-icon name="info" style="font-size: 20px; margin-top: 10px;">
            <q-tooltip class="tooltip" anchor="top left" self="bottom right" style="width: 25%" :offset="[1, 1]">
              <b style="color: orange">PASSWORD</b> IS OPTIONAL ALTHOUGH WE RECOMMEND USING A VALUE. IT IS USED TO 'SALT' NOSTR-SPECIFIC KEY GENERATION
            </q-tooltip>
          </q-icon>
        </q-input>
      </div>
      <div class="input-siwe" style="margin: -20px auto;">
        <q-input v-model="username" ref="keyInput" bottom-slots outlined label='enter username'
          dense class="q-field__bottom"
          :rules="[(val) => (val && val.length > 0) || 'cannot be empty',]"
          >
          <q-icon name="info" style="font-size: 20px; margin-top: 10px;">
            <q-tooltip class="tooltip" anchor="top left" self="bottom right" style="width: 25%" :offset="[1, 1]">
              <b style="color: orange">USERNAME</b> <b>MUST</b> BE YOUR NIP-02 OR NIP-05 IDENTIFIER. IT IS USED TO GENERATE UNIQUE KEYS FOR YOUR USERNAME
            </q-tooltip>
          </q-icon>
        </q-input>
      </div>
    </div>
    <div v-if="isConnected" style="display: block;">
      <div v-if="isSigned" style="display: flex; margin: 15px auto; justify-content: center">
        <p class="spotnik">↓ GENERATED <span style="color: orange; font-weight: 700;">PRIVATE KEYS</span> ↓</p>
      </div>
      <div style="display: block; margin: -30px auto; justify-content: center">
        <q-input v-model="key" ref="keyInput" bottom-slots outlined :disabled="!isSigned" v-if="isSigned"
          label="auto-generated from ethereum signature" style="width: inherit" dense>
        </q-input>
      </div>
      <div style="display: flex; margin: 30px; justify-content: center" class="q-mb-md" v-if="!isSigned && username.length > 0">
        <div style="width: 4%; display: flex; margin-right: 5px">
          <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
        </div>
        <q-btn size="md" @click="sign"
          style="background: linear-gradient(266deg, rgba(0,148,21,0.75) 0%, rgba(0,113,205,0.75) 100%); border: 0px solid white;"
          text-color="white" font-weight="900" :label="!isConnected ? 'Connect Ethereum Wallet' : 'Sign-In With Ethereum'"
          value="true" />
        <div style="width: 4%; display: flex; margin-left: 5px">
          <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
        </div>
      </div>
      <div style="display: flex; margin: 20px; justify-content: center" class="q-mb-md" v-if="isSigned">
        <div style="width: 4%; display: flex; margin-right: 5px">
          <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
        </div>
        <q-btn size="md" @click="proceed"
          style="background: linear-gradient(266deg, rgba(0,148,21,0.75) 0%, rgba(0,113,205,0.75) 100%); border: 0px solid white;"
          text-color="white" font-weight="900" :label="!isSigned ? 'Connect Ethereum Wallet' : 'Proceed to Login'"
          value="true" />
        <div style="width: 4%; display: flex; margin-left: 5px">
          <img src="ethereum.svg" alt="mascot_round" class="image-fit" />
        </div>
      </div>
    </div>
    <div style="margin-left: 47%; width: 100%">
      <h2 class="text-subtitle1 q-pr-md">OR</h2>
    </div>
    <q-expansion-item expand-icon="expand_more" expanded-icon="expand_less" class="no-padding items-center q-mb-md"
      header-class="items-center">
      <template #header>
        <h2 class="text-subtitle1 text-bold q-pr-md flex justify-between gt-sm" style="margin: 0 auto">
          🔐 &nbsp;Enter your custom Nostr key
        </h2>
        <h2 class="text-subtitle1 text-bold q-pr-md flex justify-between lt-md" style="margin: 0 auto; font-size: 12px;">
          🔐 &nbsp;Enter your Nostr key
        </h2>
      </template>
      <q-form @submit="proceed">
        <q-card-section class="key-entry no-padding">
          <q-btn-group spread unelevated>
            <q-btn size="md" color="primary" label="public key" :outline="!watchOnly"
              :text-color="!watchOnly ? '' : 'dark'" value="true" @click="watchOnly = true" :disable="isBech32Sec" />
            <q-btn size="md" color="primary" label="private key" :outline="watchOnly"
              :text-color="watchOnly ? '' : 'dark'" value="false" @click="watchOnly = false" :disable="isBech32Pub" />
          </q-btn-group>
          <q-input v-model="key" ref="keyInput" bottom-slots outlined
            :label="watchOnly ? 'enter public key' : 'enter private key'" style="width: inherit" dense>
            <template #hint>
              <p v-if="!key && watchOnly" style="font-size: 12px; color: white; text-transform: uppercase;">
                <q-icon name="info" style="font-size: 16px; margin-top: -2px"></q-icon>
                <b style="color: lightgreen">INFO: </b> Entering <b style="color: lightgreen">Public Key</b> means
                you will need to <b style="color: orange">Sign</b> with your
                <b style="color: orange">Private Key</b>
                each time you post content either manually or using a browser
                extension
              </p>
              <p v-if="!key && !watchOnly" style="font-size: 12px; color: white; text-transform: uppercase;">
                <span style="font-size: 14px;">⚠️</span> <b style="color: orange">WARNING: </b> Entering your
                <b style="color: orange">Private Key</b> means Dostr will
                automatically <b style="color: orange">Sign</b> with your
                <b style="color: orange">Private Key</b> each time you post
                content
              </p>
              <div class="flex justify-center spotnik" style="margin-top: 10px">
                <p v-if="key && !isKeyValid" style="font-size: 16px; color: white">
                  INVALID KEY ❌
                </p>
                <p v-if="isKeyValid" style="font-size: 16px; color: white">
                  VALID KEY ✅
                </p>
              </div>
            </template>
            <template #append>
              <q-btn type="submit" unelevated size="sm" :color="isKeyValid ? 'positive' : 'negative'"
                :font-weight="isKeyValid ? 'normal' : 'bold'" :text-color="isKeyValid ? 'white' : 'white'"
                :label="isKeyValid ? 'PROCEED' : 'ENTER KEY'" :icon-right="isKeyValid ? 'login' : 'close'"
                @click="proceed" :disabled="!isKeyValid" style="font-size: 12px; font-weight: 900"></q-btn>
            </template>
          </q-input>
          <hr style="margin-top: 50px; margin-bottom: 25px" />
          <div class="flex justify-between">
            <h2 v-if="!isKeyValid" class="text-subtitle1 text-bold q-pr-md flex justify-between" style="margin: 0 auto">
              🔑 Do not have a key?
            </h2>
          </div>
          <q-btn-group style="margin-top: 20px" spread unelevated>
            <q-btn v-if="!isKeyValid" size="md" color="primary" outline @click="generate">
              Generate Keys
            </q-btn>
            <q-btn v-if="hasExtension && !isKeyValid" size="md" color="primary" outline @click="getFromExtension">
              Use Nostr Extension
            </q-btn>
          </q-btn-group>
        </q-card-section>
        <!-- <div v-if='isBech32Key(key)'>
        {{ hexKey }}
        </div> -->
      </q-form>
      <q-expansion-item v-if="isKeyValid" class="q-mt-sm" dense dense-toggle default-opened id="bootstrap-relays">
        <template #header>
          <div class="full-width flex row no-wrap justify-center">
            <h2 class="text-subtitle1 text-bold q-pr-sm gt-sm">
              📡 &nbsp;Enter Bootstrap Relays (optional)
            </h2>
            <h2 class="text-subtitle1 text-bold q-pr-sm lt-md" style="font-size: 12px;">
              📡 &nbsp;Enter Bootstrap Relays (optional)
            </h2>
          </div>
        </template>
        <div class="flex row justify-between no-wrap items-end q-mb-sm" style="margin-top: 20px">
          <span class="q-ml-sm text-bold gt-sm">↓ Selected relays</span>
          <span class="q-ml-xs text-bold lt-md">↓ Relays</span>
          <q-icon class="gt-sm" name="info" style="font-size: 20px; margin-left: -75px; margin-top: -15px">
            <q-tooltip class="tooltip" anchor="top right" self="bottom middle" :offset="[10, 10]">
              ◦ The selected relays below will be queried to load your user
              profile, follows, and relay data from Nostr network.<br />
              ◦ Please ensure the list of selected relays includes relays you
              publish your Nostr data to, otherwise Dostr may not be able to
              find your data.
            </q-tooltip>
          </q-icon>
          <div class="flex items-end" id="new-relay-input">
            <q-input v-model="addRelay" color="lightgreen" ref="keyInput" dense bottom-slots placeholder="add new relay"
              style="padding-top: -10px">
            </q-input>
            <q-btn icon="add" color="positive" size="md" flat dense @click.stop="addNewRelay" />
          </div>
        </div>
        <BaseSelectMultiple>
          <template #selected>
            <pre class="relay-list" style="border: 1px solid var(--q-primary);">
                       <li
                         v-for='(relay, index) in Object.keys(selectedRelays)'
                         :key='index + "-" + relay'
                         class='relay-item'
                         @click.stop='delete selectedRelays[relay]'
                       >
                         <div class='flex row justify-between no-wrap'>
                           <span style='overflow: auto;'>{{ relay }}</span>
                           <q-icon name='remove' size='xs' color='negative'/>
                         </div>
                       </li>
                     </pre>
          </template>
          <template #options>
            <div style="max-height: 6.75rem">
              <pre class="relay-list">
                       <li
                         v-for='(relay, index) in optionalRelays'
                         :key='index + "-" + relay'
                         class='relay-item'
                         @click.stop='selectedRelays[relay] = { read: true, write: false }'
                       >
                         <div class='flex row justify-between no-wrap'>
                           <span style='overflow: auto;'>{{ relay }}</span>
                           <q-icon name='add' size='xs' color='positive' flat/>
                         </div>
                       </li>
                     </pre>
            </div>
          </template>
        </BaseSelectMultiple>
      </q-expansion-item>
      <div style="min-height: 1rem" />
    </q-expansion-item>
  </q-card>
  <!-- </div> -->
  <!-- </q-dialog> -->
</template>

<script>

import { defineComponent } from 'vue'
import helpersMixin from '../utils/mixin'
// import { nip06 } from 'nostr-tools'
import { generatePrivateKey, nip06 } from 'nostr-tools'
import { connectWallet, SignWithWallet } from '../utils/interact'
// import { decode } from 'bech32-buffer'
import BaseSelectMultiple from 'components/BaseSelectMultiple.vue'
import BaseInformation from 'components/BaseInformation.vue'

export default defineComponent({
  name: 'TheKeyInitializationDialog',
  mixins: [helpersMixin],
  emits: ['look-around'],

  components: {
    BaseSelectMultiple,
    BaseInformation,
  },

  setup() {
    return {
      focusKeyInput() {
        this.$refs.keyInput.focus()
      },
    }
  },

  data() {
    return {
      watchOnly: false,
      key: null,
      hasExtension: false,
      selectedRelays: this.$store.state.defaultRelays,
      newRelay: '',
      isConnected: false,
      username: '',
      password: '',
      chainId: '',
      isSigned: false
    }
  },

  computed: {
    icon() {
      return document.getElementById('icon').href
    },

    // showKeyInitialization() {
    //   if (['profile', 'event', 'hashtag', 'feed'].includes(this.$route.name)) return false
    //   return true
    // },

    isKeyKey() {
      if (this.isKey(this.hexKey)) return true
      return false
    },

    isKeyValid() {
      if (this.isKeyKey) return true
      if (nip06.validateWords(this.key?.toLowerCase())) return true
      return false
    },

    isUsernameValid() { // optional
      return true
    },

    isPasswordValid() { // optional
      return true
    },

    isKeyInvalid() {
      return !this.isKeyValid
    },

    hexKey() {
      // npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s
      // nsec1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzs46ahj9
      // 32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245
      if (this.isBech32Key(this.key)) {
        return this.bech32ToHex(this.key)
      }
      return this.key?.toLowerCase()
    },

    isBech32Pub() {
      if (this.isBech32Key(this.key)) {
        return this.key.toLowerCase().startsWith('npub')
      }
      return false
    },

    isBech32Sec() {
      if (this.isBech32Key(this.key)) {
        return this.key.toLowerCase().startsWith('nsec')
      }
      return false
    },

    optionalRelays() {
      let options = this.$store.state.optionalRelaysList.filter((relay) => {
        if (
          this.newRelay.length &&
          !relay.toLowerCase().includes(this.newRelay.toLowerCase())
        )
          return false
        if (this.selectedRelays[relay]) return false
        return true
      })
      return options
    },
  },

  async created() {
    if (!this.$store.state.keys.pub) {
      // keys not set up, offer the option to try to get a pubkey from window.nostr
      setTimeout(() => {
        if (window.nostr) {
          this.hasExtension = true
        }
      }, 1000)
    }
  },

  methods: {
    async getFromExtension() {
      try {
        this.key = await window.nostr.getPublicKey()
        this.watchOnly = true
        this.focusKeyInput()
      } catch (err) {
        this.$q.notify({
          message: `Failed to get a public key from a Nostr extension: ${err}`,
          color: 'warning',
        })
      }
    },

    async siwe() {
      let walletResponse = await connectWallet()
      if (walletResponse.address) {
        console.log(`Connected to ${walletResponse.address}`)
        this.isConnected = true
        this.chainId = walletResponse.chainId
      } else {
        this.isConnected = false
        console.log('Connection Failed')
      }
      return
    },

    disconnect() {
      this.isConnected = false
      return
    },

    async sign() {
      let signResponse = await SignWithWallet(this.username, this.password, this.chainId)
      this.key = signResponse.data.privkey
      this.watchOnly = false
      if (this.key.length > 0) {
        this.isSigned = true
      }
    },

    generate() {
      this.key = generatePrivateKey()
      this.watchOnly = false
      this.focusKeyInput()
    },

    proceed() {
      let key = this.hexKey

      var keys = {}
      // eslint-disable-next-line no-undef
      // if (validateWords(key)) {
      //   keys.mnemonic = key
      // } else if (this.isKey(key)) {
      if (this.isKey(key)) {
        if (this.watchOnly) keys.pub = key
        else keys.priv = key
      } else {
        console.warn('Proceed called with invalid key', key)
      }

      this.$store.commit('setDefaultRelays', this.selectedRelays)
      this.$store.dispatch('initKeys', keys)
      this.$store.dispatch('launch')
      this.initializeKeys = false
      this.$router.push({
        name: 'settings',
        params: { initUser: true },
      })
    },

    addNewRelay() {
      if (this.newRelay && this.newRelay.length)
        this.selectedRelays[this.newRelay] = { read: true, write: false }
      this.newRelay = ''
      this.focusKeyInput()
    },
  },
})
</script>

<style lang="css" scoped>
.q-card {
  background: linear-gradient(75deg,
      rgba(32, 139, 147, 1) 0%,
      rgba(28, 85, 113, 1) 50%,
      rgba(164, 90, 90, 1) 100%);
  padding: 1rem;
}

.q-btn {
  padding: 4px 8px 4px 8px;
  font-size: large;
  font-family: "Spotnik";
  font-weight: 900;
}

.q-input {
  padding: 1rem;
  font-size: normal;
  font-family: "SF Mono";
  font-weight: 800;
}
</style>

<style lang="css">
.relay-list {
  column-width: 15rem;
  column-gap: 0.5rem;
  width: 100%;
  min-height: 1px;
  font-family: "SF Mono";
  font-size: 0.8rem;
  white-space: nowrap;
  padding: 2px 0.5rem;
  border-radius: 2px;
  overflow-y: auto;
  overflow-x: hidden;
  border-color: green;
}

.relay-item {
  overflow: auto;
}

.spotnik {
  font-family: "Spotnik";
  font-weight: 900;
}

.image-fit {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

#new-relay-input {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  padding: 0 0 0 0.5rem;
}

.body--dark #new-relay-input {
  background: rgba(255, 255, 255, 0.08);
}

#new-relay-input .q-field--dense .q-field__control {
  height: 1.4rem !important;
}
</style>
