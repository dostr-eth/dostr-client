<template>
  <!-- <q-dialog persistent> -->
  <div>
    <q-card class="relative-position full-width" style="overflow-x: hidden">
      <div style="width: 30%; display: flex; margin: 0 auto">
        <img src="mascot_round.png" alt="mascot_round" class="image-fit" />
      </div>
      <q-btn
        icon="close"
        size="md"
        flat
        round
        class="absolute-top-right z-top"
        @click="$emit('look-around')"
      />
      <h2
        style="
          text-align: center;
          justify-content: center;
          margin-bottom: -30px;
          font-size: 16px;
        "
        class="text-h4 spotnik"
      >
        Welcome to
      </h2>
      <h1
        style="
          text-align: center;
          justify-content: center;
          margin-bottom: -5px;
          font-size: 50px;
        "
        class="text-h4 spotnik"
      >
        Dostr
      </h1>
      <h2
        style="text-align: center; justify-content: center; font-size: 16px"
        class="text-h6 spotnik"
      >
        Ethereum-flavoured Nostr
      </h2>
      <q-expansion-item
        expand-icon="expand_more"
        expanded-icon="expand_less"
        class="intro full-width items-center q-mb-md"
        header-class="items-center"
      >
        <template #header>
          <span class="text-bold flex justify-between" style="margin: 0 auto">
            <q-icon name="info" style="margin-top: -1.25px"></q-icon>
            <span
              class="lt-md"
              style="font-size: 14px; margin: -4px 0 0 8px; color: yellow"
            >
              Learn about Dostr
            </span>
            <span
              class="gt-sm"
              style="font-size: 14px; margin: -4px 0 0 10px; color: yellow"
            >
              Click here to learn about Nostr
            </span>
          </span>
        </template>
        <div>
          <BaseInformation />
        </div>
        <div style="margin-top: 5px">
          <span
            style="
              padding: 0.2rem 0 0 0.2rem;
              font-size: 10pt;
              font-family: 'SF Mono';
              letter-spacing: -0.5px;
            "
          >
            ℹ️ This same information can be found in the
            <strong>FAQ</strong> section at the bottom of the
            <strong>Settings</strong> page after Login
          </span>
        </div>
      </q-expansion-item>
      <hr style="margin-bottom: 25px" />
      <div
        style="display: flex; margin: 0; justify-content: center"
        class="q-mb-md"
        v-if="!isConnectedMetamask && !this.$store.state.walletConnect"
      >
        <q-btn
          size="md"
          @click="showWeb3modal"
          outline
          color="blue-2"
          font-weight="900"
          :disable="walletsList"
          :label="
            !isConnectedMetamask || !this.$store.state.walletConnect
              ? '&nbsp;Connect with Ethereum'
              : ''
          "
        >
        <span>&nbsp;</span>
        <q-avatar size="20px">
          <img src="ethereum.svg" />
        </q-avatar>
        </q-btn>
      </div>
      <div
        style="display: flex; margin: 20px; justify-content: center"
        class="q-mb-md"
        v-if="hasExtension && !walletsList"
      >
        <q-btn
          size="md"
          outline
          color="yellow-3"
          font-weight="900"
          :disable="!hasExtension"
          @click="getFromExtension"
        >
          &nbsp;Connect Nostr Extension&nbsp;
        </q-btn>
      </div>
      <div
        v-if="
          walletsList &&
          !this.$store.state.walletConnect &&
          !isConnectedMetamask
        "
        style="position: relative"
      >
        <div style="display: flex; margin: 0 auto; justify-content: center">
          <q-btn
            v-if="!this.isMobileDevice()"
            size="md"
            @click="siwe"
            style="
              background: black;
              margin-top: 15px;
              border: 0px solid white;
              width: auto;
            "
            text-color="orange"
            font-weight="700"
            label="&nbsp;Metamask&nbsp;"
          >
            <q-avatar size="25px">
              <img src="../assets/metamask.png" />
            </q-avatar>
          </q-btn>
          <q-btn
            v-if="this.isMobileDevice() && !this.isMetamask()"
            size="md"
            @click="redirect"
            style="
              background: black;
              margin-top: 15px;
              border: 0px solid white;
              width: auto;
            "
            text-color="white"
            font-weight="700"
            label="&nbsp;Metamask&nbsp;"
          >
            <q-avatar size="25px">
              <img src="../assets/metamask.png" />
            </q-avatar>
          </q-btn>
          <q-btn
            v-if="this.isMobileDevice() && this.isMetamask()"
            size="md"
            @click="siwe"
            style="
              background: black;
              margin-top: 15px;
              border: 0px solid white;
              width: auto;
            "
            text-color="yellow-8"
            font-weight="700"
            label="&nbsp;Connect&nbsp;"
          >
            <q-avatar size="25px">
              <img src="../assets/metamask.png" />
            </q-avatar>
          </q-btn>
        </div>
        <div style="display: flex; margin: 0 auto; justify-content: center">
          <q-btn
            size="md"
            @click="web3modal"
            style="
              background: black;
              margin-top: 15px;
              border: 0px solid white;
              width: auto;
            "
            text-color="blue"
            font-weight="700"
            label="&nbsp;Wallet Connect&nbsp;"
          >
            <q-avatar size="25px">
              <img src="../assets/walletConnect.png" />
            </q-avatar>
          </q-btn>
        </div>
        <div
          style="display: flex; margin: 20px; justify-content: center"
          class="q-mb-md"
          v-if="hasExtension && walletsList"
        >
          <q-btn
            size="md"
            outline
            color="yellow-3"
            font-weight="900"
            :disable="!hasExtension"
            @click="getFromExtension"
          >
            &nbsp;Connect Nostr Extension&nbsp;
          </q-btn>
        </div>
      </div>
      <div
        style="display: flex; margin: 0; justify-content: center"
        class="q-mb-md"
        v-if="isConnectedMetamask"
      >
        <q-btn
          size="md"
          @click="disconnectMetamask"
          style="background: black; border: 0px solid white"
          text-color="red"
          font-weight="900"
          :label="!isConnectedMetamask ? '' : '&nbsp;Disconnect&nbsp;'"
        >
          <q-avatar size="25px">
            <img src="../assets/metamask.png" />
          </q-avatar>
        </q-btn>
      </div>
      <div
        style="display: flex; margin: 0; justify-content: center"
        class="q-mb-md"
        v-if="this.$store.state.walletConnect"
      >
        <q-btn
          size="md"
          @click="disconnectWalletConnect"
          style="background: black; border: 0px solid white"
          text-color="red"
          font-weight="900"
          :label="
            !this.$store.state.walletConnect ? '' : '&nbsp;Disconnect&nbsp;'
          "
        >
          <q-avatar size="25px">
            <img src="../assets/walletConnect.png" />
          </q-avatar>
        </q-btn>
      </div>
      <div
        v-if="isConnectedMetamask || this.$store.state.walletConnect"
        style="position: relative"
      >
        <div class="input-siwe" style="margin: 10px auto">
          <q-input
            v-model="password"
            ref="keyInput"
            bottom-slots
            type="password"
            outlined
            label="enter password (optional)"
            dense
            class="q-field__bottom"
          >
            <q-icon name="info" style="font-size: 20px; margin-top: 10px">
              <q-tooltip
                class="tooltip"
                anchor="top left"
                self="bottom right"
                style="width: auto"
                :offset="[1, 1]"
              >
                <b style="color: orange">PASSWORD</b> IS OPTIONAL ALTHOUGH WE
                RECOMMEND USING A VALUE. IT IS USED TO 'SALT' NOSTR-SPECIFIC KEY
                GENERATION
              </q-tooltip>
            </q-icon>
          </q-input>
        </div>
        <div class="input-siwe" style="margin: -20px auto">
          <q-input
            v-model="username"
            ref="keyInput"
            bottom-slots
            outlined
            label="NIP-02/05 username"
            dense
            class="q-field__bottom"
            :rules="[(val) => isLegitUser(val) || 'empty or illegal username']"
          >
            <q-icon name="info" style="font-size: 20px; margin-top: 10px">
              <q-tooltip
                class="tooltip"
                anchor="top left"
                self="bottom right"
                style="width: auto"
                :offset="[1, 1]"
              >
                <b style="color: orange">USERNAME</b> <b>MUST</b> BE YOUR NIP-02
                OR NIP-05 IDENTIFIER (HINT: lowercase 'user' or
                'user@domain.wtf'). IT IS USED TO GENERATE UNIQUE KEYS FOR YOUR
                USERNAME
              </q-tooltip>
            </q-icon>
          </q-input>
        </div>
      </div>
      <div
        v-if="isConnectedMetamask || this.$store.state.walletConnect"
        style="display: block"
      >
        <div
          v-if="isLoading"
          style="display: flex; margin: 30px auto; justify-content: center"
        >
          <p
            class="spotnik"
            style="font-size: 16px; color: yellow; font-weight: 700"
          >
            VERIFYING RECORDS &nbsp;<q-icon
              name="hourglass_top"
              size="sm"
              style="margin-top: -2px"
            ></q-icon>
          </p>
        </div>
        <div
          v-if="isSigned"
          style="display: flex; margin: 30px auto; justify-content: center"
        >
          <p class="spotnik">
            ↓ GENERATED
            <span style="color: orange; font-weight: 700">PRIVATE KEYS</span> ↓
          </p>
        </div>
        <div
          style="display: block; margin: -30px auto; justify-content: center"
        >
          <q-input
            v-model="key"
            ref="keyInput"
            bottom-slots
            outlined
            :disabled="!isSigned"
            v-if="isSigned"
            label="auto-generated from ethereum signature"
            style="width: inherit"
            dense
          >
          </q-input>
        </div>
        <div
          style="display: flex; margin: 40px; justify-content: center"
          class="q-mb-md"
          v-if="!isSigned && username.length > 0"
        >
          <q-btn
            size="md"
            @click="sign"
            class="siwe-button"
            text-color="white"
            font-weight="900"
            :label="
              !isConnectedMetamask && !this.$store.state.walletConnect
                ? ''
                : '&nbsp;Sign-In With Ethereum'
            "
            value="true"
          >
            <q-avatar size="20px">
              <img src="ethereum.svg" />
            </q-avatar>
            <span>&nbsp;</span>
          </q-btn>
        </div>
        <div
          style="display: flex; margin: 30px; justify-content: center"
          class="q-mb-md"
          v-if="isSigned"
        >
          <q-btn
            size="md"
            @click="proceed"
            class="siwe-button"
            text-color="white"
            font-weight="900"
            :label="!isSigned ? '' : '&nbsp;Proceed to Login'"
            value="true"
          >
            <q-avatar size="20px">
              <img src="ethereum.svg" />
            </q-avatar>
            <span>&nbsp;</span>
          </q-btn>
        </div>
      </div>
      <div
        v-if="!this.$store.state.chainId"
        style="margin-top: 40px; margin-left: 47%; width: 100%"
      >
        <h2 class="text-subtitle1 q-pr-md">OR</h2>
      </div>
      <div
        v-if="this.$store.state.chainId"
        style="margin-top: 100px; width: 100%"
      ></div>
      <q-expansion-item
        v-if="!this.$store.state.chainId"
        expand-icon="expand_more"
        expanded-icon="expand_less"
        class="no-padding items-center q-mb-md"
        header-class="items-center"
      >
        <template #header>
          <h2
            class="text-subtitle1 text-bold q-pr-md flex justify-between gt-sm"
            style="margin: 0 auto"
          >
            🔐 &nbsp;Enter your custom Nostr key
          </h2>
          <h2
            class="text-subtitle1 text-bold q-pr-md flex justify-between lt-md"
            style="margin: 0 auto; font-size: 15px"
          >
            🔐 &nbsp;Enter your Nostr key
          </h2>
        </template>
        <q-form @submit="proceed">
          <q-card-section class="key-entry no-padding">
            <q-btn-group spread unelevated>
              <q-btn
                size="md"
                color="primary"
                label="public key"
                :outline="!watchOnly"
                :text-color="!watchOnly ? '' : 'dark'"
                value="true"
                @click="watchOnly = true"
                :disable="isBech32Sec"
              />
              <q-btn
                size="md"
                color="primary"
                label="private key"
                :outline="watchOnly"
                :text-color="watchOnly ? '' : 'dark'"
                value="false"
                @click="watchOnly = false"
                :disable="isBech32Pub"
              />
            </q-btn-group>
            <q-input
              v-model="key"
              ref="keyInput"
              bottom-slots
              outlined
              :label="watchOnly ? 'enter public key' : 'enter private key'"
              style="width: inherit"
            >
              <template #hint>
                <p
                  v-if="!key && watchOnly"
                  class="sf-mono-tight"
                  style="font-size: 13px; color: white"
                >
                  <q-icon
                    name="info"
                    style="font-size: 16px; margin-top: -2px"
                  ></q-icon>
                  <b style="color: lightgreen"> INFO: </b> Entering your
                  <b style="color: lightgreen">Public Key</b> means you will
                  need to <b style="color: orange">Sign</b> with your
                  <b style="color: orange">Private Key</b>
                  each time you post content either manually or with a browser
                  extension. This method is secure but inconvenient.
                </p>
                <p
                  v-if="!key && !watchOnly"
                  class="sf-mono-tight"
                  style="font-size: 13px; color: white"
                >
                  <span style="font-size: 12px; padding-bottom: 10px">⚠️&nbsp;</span>
                  <b style="color: orange">WARNING:</b>
                  Entering your
                  <b style="color: orange">Private Key</b> to Login means Dostr
                  will automatically <b style="color: orange">Sign</b> with your
                  <b style="color: orange">Private Key</b> each time you post
                  content. This method is convenient although relatively
                  insecure.
                </p>
                <div
                  class="flex justify-center spotnik"
                  style="margin-top: 10px"
                >
                  <p
                    v-if="key && !isKeyValid"
                    style="font-size: 16px; color: white"
                  >
                    INVALID KEY ❌
                  </p>
                  <p v-if="isKeyValid" style="font-size: 16px; color: white">
                    VALID KEY ✅
                  </p>
                </div>
              </template>
              <template #append>
                <q-btn
                  type="submit"
                  unelevated
                  size="sm"
                  :color="isKeyValid ? 'positive' : 'negative'"
                  :font-weight="isKeyValid ? 'normal' : 'bold'"
                  :text-color="isKeyValid ? 'white' : 'white'"
                  :label="isKeyValid ? 'PROCEED' : 'ENTER KEY'"
                  :icon-right="isKeyValid ? 'login' : 'close'"
                  @click="proceed"
                  :disabled="!isKeyValid"
                  style="font-size: 12px; font-weight: 900"
                ></q-btn>
              </template>
            </q-input>
            <hr class="ruler-mobile" />
            <div class="flex justify-between">
              <h2
                v-if="!isKeyValid"
                class="text-subtitle1 text-bold q-pr-md flex justify-between"
                style="margin: 0 auto"
              >
                🔑 Do not have a key?
              </h2>
            </div>
            <q-btn-group style="margin-top: 20px" spread unelevated>
              <q-btn
                v-if="!isKeyValid"
                size="md"
                color="primary"
                outline
                @click="generate"
              >
                Generate Nostr Keys
              </q-btn>
            </q-btn-group>
          </q-card-section>
          <!-- <div v-if='isBech32Key(key)'>
        {{ hexKey }}
        </div> -->
        </q-form>
      </q-expansion-item>
      <div
        v-if="isKeyValid && this.$store.state.chainId"
        style="margin-top: -75px"
      />
      <q-expansion-item
        v-if="isKeyValid"
        class="q-mt-sm"
        dense
        dense-toggle
        default-opened
        id="bootstrap-relays"
        style="margin-top: -50px"
      >
        <template #header>
          <div class="full-width flex row no-wrap justify-center">
            <h2 class="text-subtitle1 text-bold q-pr-sm gt-sm">
              📡 &nbsp;Enter Bootstrap Relays (optional)
            </h2>
            <h2
              class="text-subtitle1 text-bold q-pr-sm lt-md"
              style="font-size: 13px"
            >
              📡 &nbsp;Enter Relays (optional)
            </h2>
          </div>
        </template>
        <div
          class="flex row justify-between no-wrap items-end q-mb-sm"
          style="margin-top: 20px"
        >
          <div class="flex row no-wrap items-center">
            <q-icon name="info" style="font-size: 20px; margin-top: 0px">
              <q-tooltip
                class="tooltip"
                anchor="top right"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <span style="text-transform: uppercase"
                  >❗ The list of
                  <span style="color: orange">Selected Relays</span> shown below
                  will be queried to load your user Profile, Follows, and Relay
                  data from Nostr Network.<br />
                  ❗ Please ensure that the
                  <span style="color: orange">Selected Relays</span> includes
                  relays that you publish your Nostr data to. Otherwise, Dostr
                  may not be able to find your data.
                </span>
              </q-tooltip>
            </q-icon>
            <span class="q-ml-sm text-bold gt-sm">Selected relays</span>
            <span class="q-ml-xs text-bold lt-md">Relays</span>
          </div>
          <div class="flex items-end" id="new-relay-input">
            <div
              style="
                display: flex;
                margin: 10px 5px -7px 0px;
                justify-content: center;
              "
            >
              <q-input
                v-model="addRelay"
                color="lightgreen"
                ref="keyInput"
                dense
                outlined
                bottom-slots
                placeholder="add new relay"
                style="padding-top: 0px"
              >
                <q-btn
                  icon="add"
                  color="positive"
                  size="sm"
                  flat
                  dense
                  @click.stop="addNewRelay"
                />
              </q-input>
            </div>
          </div>
        </div>
        <BaseSelectMultiple>
          <template #selected>
            <pre class="relay-list" style="border: 1px solid var(--q-primary)">
                <li
                  v-for='(relay, index) in Object.keys(selectedRelays)'
                  :key='index + "-" + relay'
                  class='relay-item'
                  @click.stop='delete selectedRelays[relay]'>
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
                    @click.stop='selectedRelays[relay] = { read: true, write: false }'>
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
      <div class="pad-mobile" />
    </q-card>
  </div>
  <!-- </q-dialog> -->
</template>

<script>
import { defineComponent } from 'vue'
import helpersMixin from '../utils/mixin'
// import { nip06 } from 'nostr-tools'
import { generatePrivateKey, nip06 } from 'nostr-tools'
import {
  connectWallet,
  SignWithWallet,
  SignWithWalletStandalone,
} from '../utils/interact'
import { web3Modal, ethereumClient } from '../utils/web3modal'
// import { decode } from 'bech32-buffer'
import BaseSelectMultiple from 'components/BaseSelectMultiple.vue'
import BaseInformation from 'components/BaseInformation.vue'
import metadata from '../../package.json'
import { copyToClipboard } from 'quasar'

export default defineComponent({
  name: 'TheKeyInitializationDialog',
  mixins: [helpersMixin],
  emits: ['look-around', 'wallet-dialog'],

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
      isConnectedMetamask: false,
      username: '',
      password: '',
      isSigned: false,
      isSignedStandalone: false,
      walletsList: false,
      isLoading: false,
    }
  },

  computed: {
    icon() {
      return document.getElementById('icon').href
    },

    showKeyInitialization() {
      if (this.$store.state.walletModal) return false
      return true
    },

    isKeyKey() {
      if (this.isKey(this.hexKey)) return true
      return false
    },

    isKeyValid() {
      if (this.isKeyKey) return true
      if (nip06.validateWords(this.key?.toLowerCase())) return true
      return false
    },

    isUsernameValid() {
      // optional
      return true
    },

    isPasswordValid() {
      // optional
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
      setTimeout(() => {
        if (window.nostr) {
          this.hasExtension = true
        }
      }, 1000)
    }
  },

  methods: {
    isLegitUser(val) {
      if (val.length === 0 || val.length > 100) {
        return false
      } else {
        if (val.includes('@')) {
          if (val.split('@').length === 2) {
            if (val.split('@')[1].includes('.')) {
              if (
                val.split('@')[0].match(/^[a-z0-9-_]+$/) &&
                val.match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
              ) {
                this.$store.state.username = val
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          if (val.match(/^[a-z0-9-_]+$/)) {
            this.$store.state.username = val
            return true
          } else {
            return false
          }
        }
      }
    },

    isMobileDevice() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true
      } else {
        return false
      }
    },

    async getFromExtension() {
      try {
        this.key = await window.nostr.getPublicKey()
        this.watchOnly = true
        this.focusKeyInput()
      } catch (err) {
        this.$q.notify({
          message: `❌ Failed to get a public key from a Nostr extension`,
          color: 'warning',
          classes: 'notify',
        })
      }
    },

    redirect() {
      this.$emit('look-around')
      let url =
        'https://metamask.app.link/dapp/' +
        metadata.homepage.toString().split('://').pop() +
        '/'
      window.open(url).focus()
    },

    isMetamask() {
      if (window.ethereum) {
        return true
      }
      return false
    },

    async siwe() {
      this.walletsList = false
      let walletResponse = await connectWallet()
      if (walletResponse.address) {
        console.log(`Connected to ${walletResponse.address}`)
        this.isConnectedMetamask = true
        this.$store.state.walletConnect = false
        this.$store.state.chainId = walletResponse.chainId
      } else {
        this.isConnectedMetamask = false
        this.$store.state.walletConnect = false
        console.log('Connection Failed')
      }
      return
    },

    disconnectMetamask() {
      this.isConnectedMetamask = false
      this.$store.state.walletConnect = false
      this.$store.state.walletModal = false
      this.walletsList = false
      return
    },

    disconnectWalletConnect() {
      this.isConnectedMetamask = false
      this.$store.state.walletConnect = false
      this.$store.state.walletModal = false
      this.walletsList = false
      return
    },

    async sign() {
      if (this.username.includes('@')) this.isLoading = true
      let signResponse = await SignWithWallet(
        this.username,
        this.password,
        this.$store.state.chainId
      )
      if (this.username.includes('@')) this.isLoading = false
      this.key = signResponse.data.privkey
      this.watchOnly = false
      if (this.key && this.key?.length > 0) {
        this.isSigned = true
      } else {
        if (!signResponse.status.includes('user rejected signing')) {
          this.$q.notify({
            message: `❌ NIP-05 '${
              this.username
            }' doesn't exist or Public Key doesn't match the records${'\n\n'}⚠️ If you are trying to Login with 
              your NIP-05 for the first time, you'll need to register first by generating your new Public Key in standalone mode and uploading it
              to your NIP-05 provider. Click on 'REGISTER' to generate your Public Key`,
            color: 'warning',
            classes: 'notify',
            timeout: 0,
            actions: [
              {
                label: 'Register',
                color: 'yellow',
                handler: () => {
                  this.signStandalone()
                },
              },
            ],
          })
        } else {
          this.$q.notify({
            message: `⚠️ Signature request rejected by user`,
            color: 'negative',
            classes: 'notify',
          })
        }
      }
    },

    async signStandalone() {
      let signResponse = await SignWithWalletStandalone(
        this.username,
        this.password,
        this.$store.state.chainId
      )
      let pubkey = signResponse.data.pubkey
      this.watchOnly = false
      if (pubkey && pubkey?.length > 0) {
        this.isSignedStandalone = true
        this.$q.notify({
          message: `ℹ️ Your Public Key associated with ${this.username} is: ${
            !this.isMobileDevice()
              ? pubkey
              : pubkey.slice(0, 10) + '...' + pubkey.slice(-10)
          }. Please copy and upload this key to your NIP-05 provider to use Sign-In With Ethereum`,
          color: 'positive',
          classes: 'notify',
          timeout: 0,
          closeBtn: false,
          actions: [
            {
              label: 'Copy Public Key',
              color: 'white',
              handler: () => {
                this.copyCode(pubkey)
              },
            },
            {
              label: 'Close',
              color: 'black',
              handler: () => {
                this.username = ''
              },
            },
          ],
        })
      } else {
        this.$q.notify({
          message: `❌ Failed to generate Public Key for NIP-05 '${this.username}'`,
          color: 'warning',
          classes: 'notify',
        })
      }
    },

    generate() {
      this.key = generatePrivateKey()
      this.watchOnly = false
    },

    showWeb3modal() {
      this.walletsList = true
    },

    copyCode(val) {
      let toCopy = val
      copyToClipboard(toCopy)
        .then(() => {
          this.username = ''
        })
        .catch(() => {
          this.username = ''
        })
    },

    async web3modal() {
      this.$store.state.walletModal = true
      this.watchOnly = false
      await web3Modal.openModal()
      while (true) { // eslint-disable-line no-constant-condition
        if (ethereumClient.getAccount().isConnected) {
          break
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      if (ethereumClient.getAccount().isConnected) {
        this.$emit('wallet-dialog')
        console.log('Connected with WalletConnect')
        this.$store.state.walletConnect = true
        this.isConnectedMetamask = false
        this.$store.state.chainId = ethereumClient
          .getNetwork()
          .chain.id.toString()
        this.$store.state.walletModal = false
        this.walletsList = false
      } else {
        this.isConnectedMetamask = false
        this.$store.state.walletConnect = false
        console.log('Connection Failed')
      }
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
  background: linear-gradient(
    75deg,
    rgba(32, 139, 147, 1) 0%,
    rgba(28, 85, 113, 1) 50%,
    rgba(164, 90, 90, 1) 100%
  );
  padding: 1rem;
}

.q-btn {
  padding: 4px 8px 4px 8px;
  font-size: large;
  font-family: "Spotnik";
  font-weight: 900;
}

.q-input {
  padding-bottom: 1rem;
  font-size: normal;
  font-family: "SF Mono";
  font-weight: 500;
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
  height: 2rem !important;
}

@media screen and (max-width: 600px) {
  #new-relay-input {
    width: 60%;
  }
}
</style>
