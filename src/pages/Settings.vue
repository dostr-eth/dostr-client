<template>
  <q-page style="margin-top: 15px; margin-bottom: 100px" id="settings-page">
    <BaseHeader style="margin-left: 30px" class="spotnik">{{
      $t("settings")
    }}</BaseHeader>
    <q-form
      class="q-gutter-md section"
      @submit="setMetadata"
      style="margin-top: 15px"
    >
      <div
        v-if="editingMetadata"
        class="flex gt-sm"
        style="margin-left: 77%; gap: 0.2rem"
      >
        <q-btn label="save" color="positive" outline size="sm" type="submit" />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('metadata')"
        />
      </div>
      <div
        v-if="editingMetadata"
        class="flex lt-md"
        style="margin-left: 65%; gap: 0.2rem"
      >
        <q-btn label="save" color="positive" outline size="sm" type="submit" />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('metadata')"
        />
      </div>
      <div
        class="text-bold flex justify-between no-wrap spotnik"
        style="font-size: 1.1rem"
      >
        {{ $t("profile") }}
        <q-btn
          v-if="!editingMetadata"
          label="edit"
          color="primary"
          outline
          size="sm"
          :disable="!$store.getters.canSignEventsAutomatically"
          @click="editingMetadata = true"
        />
      </div>
      <q-input
        v-if="!this.$store.state.chainId"
        v-model="metadata.name"
        dense
        filled
        type="text"
        label="Name"
        :disable="!editingMetadata"
      >
        <template #before>
          <q-icon name="alternate_email" />
        </template>
      </q-input>
      <q-input
        v-if="this.$store.state.chainId"
        v-model="metadata.name"
        :value="nickname"
        dense
        filled
        type="text"
        label="Name"
        :disable="this.$store.state.chainId.length > 0"
      >
        <template #before>
          <q-icon name="alternate_email" />
        </template>
      </q-input>
      <q-input
        v-model="metadata.about"
        :disable="!editingMetadata"
        filled
        autogrow
        dense
        type="text"
        label="About [max. 150 characters]"
        maxlength="300"
      />
      <q-input
        v-model.trim="metadata.picture"
        :disable="!editingMetadata"
        filled
        dense
        type="text"
        label="Picture URL"
        maxlength="150"
      >
        <template #after>
          <BaseUserAvatar
            v-if="metadata.picture"
            :pubkey="$store.state.keys.pub"
            rounded
          />
        </template>
      </q-input>
      <q-input
        v-if="!this.$store.state.chainId"
        v-model.trim="metadata.nip05"
        :disable="!editingMetadata"
        filled
        dense
        type="text"
        label="NIP-05 Identifier"
        maxlength="100"
      >
        <q-icon
          class="items-end"
          name="info"
          size="sm"
          style="margin-top: 7px;"
          @click="openExternalLink('/readme/readme.htm?src=https://gist.githubusercontent.com/sshmatrix/ad172b4f0daa5f03560eef94f11f73c3/raw/dbc8a73c537d42383c3cd173f7db4d7c1ac4421c/NIP-05_ENS.md')"
        >
          <q-tooltip
            class="tooltip"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            style="text-transform: uppercase;"
            >
              Click to manually set your NIP-05 on ENS domain. This process will be automated soon
            </q-tooltip>
        </q-icon>
      </q-input>
      <q-input
        v-if="this.$store.state.chainId"
        v-model.trim="metadata.nip05"
        dense
        filled
        type="text"
        :placeholder="
          this.username !== this.petname ? this.username : 'NIP-05 Identifier'
        "
        :disable="this.$store.state.chainId.length > 0"
        maxlength="100"
      >
      </q-input>
      <div class="flex row no-wrap" style="gap: 1rem">
        <q-input
          v-model.trim="metadata.lud06"
          :disable="!editingMetadata"
          filled
          dense
          type="text"
          label="Lightning Address or LUD-06 Identifier"
          maxlength="150"
          class="full-width"
        >
          <q-icon
            class="items-end"
            name="info"
            size="sm"
            style="margin-top: 7px;"
            @click="dialogVisible = false, openExternalLink('/readme/readme.htm?src=https://gist.githubusercontent.com/sshmatrix/59fccb1279ffe5f0d548f31c5c544246/raw/55ffcfefbeafb494eec899146275c79c40f4bc25/LUD-06_ENS.md')"
          >
            <template>
              <q-dialog v-model="dialogVisible">
                <q-card>
                  <q-card-section>
                    <q-markdown :tree="markdownTree">
                      {{ markdownContent }}
                    </q-markdown>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn label="Close" color="black" @click="dialogVisible = false" @error="handleMarkdownError" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </template>
            <q-tooltip
              class="tooltip"
              anchor="center left"
              self="center right"
              :offset="[10, 10]"
              style="text-transform: uppercase;"
              >
                Click to manually set your LUD-06 on ENS domain. This process will be automated soon
              </q-tooltip>
          </q-icon>
        </q-input>
        <q-btn
          v-if="hasLnAddr"
          :label="showLnAddr ? 'Show LN-URL (lnurl)' : 'Show Lightning address'"
          @click="convertLud06"
          outline
          dense
          no-wrap
        />
      </div>
    </q-form>

    <q-separator color="accent" style="margin-bottom: 5px" />
    <ThePreferences @update-font="updateFont" />
    <q-separator color="accent" />
    <div class="section">
      <div
        v-if="editingRelays"
        class="flex gt-sm"
        style="margin-left: 77%; gap: 0.2rem"
      >
        <q-btn
          label="save"
          color="positive"
          outline
          size="sm"
          @click="saveRelays"
        />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('relays')"
        />
      </div>
      <div
        v-if="editingRelays"
        class="flex lt-md"
        style="margin-left: 65%; gap: 0.2rem"
      >
        <q-btn
          label="save"
          color="positive"
          outline
          size="sm"
          @click="saveRelays"
        />
        <q-btn
          label="cancel"
          color="negative"
          outline
          size="sm"
          @click="cancel('relays')"
        />
      </div>
      <div
        class="text-bold flex justify-between no-wrap spotnik"
        style="font-size: 1.1rem"
      >
        {{ $t("relays") }}
        <div
          class="text-normal flex row no-wrap"
          style="font-size: 0.6rem; gap: 0.4rem"
        >
          <q-btn
            v-if="!editingRelays"
            label="edit"
            color="primary"
            outline
            size="sm"
            :disable="!$store.getters.canSignEventsAutomatically"
            @click="editingRelays = true"
          />
          <div
            v-if="editingRelays"
            style="margin: 10px 7px 0 0; color: lightgreen"
          >
            read
          </div>
          <div v-if="editingRelays" style="margin: 10px 0 0; color: orange">
            write
          </div>
        </div>
      </div>
      <q-list class="flex column q-pt-xs" style="gap: 0.2rem">
        <q-item
          v-for="url in Object.keys(relays)"
          :key="url"
          class="flex justify-between items-center no-wrap no-padding"
          style="min-height: 1.2rem"
        >
          <div
            class="flex row justify-between no-wrap"
            style="
              display: inline-block;
              overflow-y: hidden;
              white-space: nowrap;
            "
          >
            <q-btn
              v-if="!editingRelays && (relays[url].read || relays[url].write)"
              color="secondary"
              outline
              size="sm"
              label="Share"
              :disable="
                hasJustSharedRelay || !$store.getters.canSignEventsAutomatically
              "
              @click="shareRelay(url)"
            >
              <q-tooltip
                anchor="top right"
                self="center left"
                :offset="[0, 40]"
                class="tooltip-url lt-md"
                >{{ url }}</q-tooltip
              >
            </q-btn>
            <q-btn
              v-if="editingRelays"
              color="negative"
              label="remove"
              outline
              size="sm"
              @click="removeRelay(url)"
            >
              <q-tooltip
                anchor="center right"
                self="center left"
                :offset="[0, 40]"
                class="tooltip-url lt-md"
                >{{ url }}</q-tooltip
              >
            </q-btn>
            <span
              class="sf-mono ellipses gt-sm"
              style="
                margin-left: 10px;
                margin-right: 5px;
                max-width: 90%;
                font-size: 13px;
                letter-spacing: -0.5px;
                white-space: nowrap;
                overflow: auto;
              "
              >{{ url }}</span
            >
            <span
              class="sf-mono ellipses lt-md"
              style="
                margin-left: 10px;
                margin-right: 5px;
                max-width: 90%;
                font-size: 13px;
                letter-spacing: -0.5px;
                white-space: nowrap;
                overflow: auto;
              "
              >{{ shortUrl(url) }}</span
            >
          </div>
          <div
            class="flex no-wrap items-center"
            style="gap: 0.6rem; margin-right: 5px"
          >
            <q-toggle
              v-if="editingRelays"
              v-model="relays[url].read"
              size="sm"
              dense
              checked-icon="check"
              unchecked-icon="clear"
              color="green-6"
              keep-color
              class="no-padding"
              :disable="!$store.getters.canSignEventsAutomatically"
            />
            <q-toggle
              v-if="editingRelays"
              v-model="relays[url].write"
              size="sm"
              dense
              color="orange"
              checked-icon="check"
              unchecked-icon="clear"
              keep-color
              class="no-padding"
              :disable="!$store.getters.canSignEventsAutomatically"
            />
          </div>
        </q-item>
      </q-list>
      <q-form v-if="editingRelays" class="q-py-xs" @submit="addRelay">
        <div
          class="flex row no-wrap q-mx-sm q-mt-sm"
          id="new-relay-input"
          style="margin-bottom: 10px"
        >
          <q-input
            v-model="newRelay"
            placeholder="add a relay..."
            autofocus
            class="full-width"
            input-style="padding: 2px 2px 2px 2px;"
            @keypress.enter="addRelay"
            dense
            borderless
          />
          <q-btn
            icon="add"
            color="positive"
            size="sm"
            flat
            dense
            @click.stop="addRelay"
          />
        </div>
        <BaseSelectMultiple>
          <template #options>
            <div style="max-height: 6.75rem">
              <pre class="relay-list">
                <li
                  v-for='(relay, index) in optionalRelays'
                  :key='index + "-" + relay'
                  class='relay-item'
                  @click.stop='relays[relay] = { read: true, write: true }'
                >
                  <div class='flex row justify-between no-wrap'>
                    <span>{{ relay }}</span>
                    <q-icon name='add' size='xs' color='positive' flat/>
                  </div>
                </li>
              </pre>
            </div>
          </template>
        </BaseSelectMultiple>
      </q-form>
    </div>

    <q-separator color="accent" />
    <q-expansion-item
      dense
      expand-icon="info"
      expanded-icon="expand_less"
      class="full-width items-center"
      header-class="items-center"
    >
      <template #header>
        <div
          class="text-bold flex justify-between no-wrap full-width"
          style="font-size: 1.1rem"
        >
          {{ $t("faq") }}
        </div>
      </template>
      <q-card-section>
        <BaseInformation />
      </q-card-section>
    </q-expansion-item>
    <q-separator color="accent" />

    <div class="flex no-wrap section gt-sm" style="gap: 0.2rem">
      <q-btn
        label="view keys&nbsp;"
        outline
        color="light-green-3"
        @click="keysDialog = true"
      >
        <q-icon name="vpn_key" />
      </q-btn>
      <q-btn label="log out&nbsp;" outline color="red-3" @click="logout">
        <q-icon name="logout" />
      </q-btn>
      <q-btn
        label="delete local data&nbsp;"
        color="negative"
        @click="hardReset"
      >
        <q-icon name="power_settings_new" />
      </q-btn>
      <q-btn
        label="dev tools&nbsp;"
        outline
        color="blue-3"
        :to="{ name: 'devTools' }"
      >
        <q-icon name="build" />
      </q-btn>
    </div>
    <div class="flex section lt-md" style="align: center; gap: 0.2rem">
      <q-btn
        style="width: 100%"
        label="view your keys&nbsp;"
        outline
        color="light-green-3"
        @click="keysDialog = true"
      >
        <q-icon name="vpn_key" />
      </q-btn>
      <q-btn
        style="width: 100%"
        label="logout&nbsp;"
        outline
        color="red-3"
        @click="logout"
      >
        <q-icon name="logout" />
      </q-btn>
      <q-btn
        style="width: 100%"
        label="delete local data&nbsp;"
        color="negative"
        @click="hardReset"
      >
        <q-icon name="power_settings_new" />
      </q-btn>
      <q-btn
        style="width: 100%"
        label="dev tools&nbsp;"
        outline
        color="blue-3"
        :to="{ name: 'devTools' }"
      >
        <q-icon name="build" />
      </q-btn>
    </div>

    <q-dialog
      v-model="keysDialog"
      style="border: 0 solid black; border-radius: 5px"
      class="rajdhani"
    >
      <q-card class="px-4 py-2">
        <q-card-section>
          <div
            style="
              display: flex;
              margin: 5px auto 15px;
              justify-content: center;
            "
          >
            <div
              style="font-size: 24px"
              class="spotnik text-bold tracking-wide leading-relaxed py-2"
            >
              YOUR KEYS <q-icon name="vpn_key" />
            </div>
          </div>
          <div
            style="
              display: flex;
              margin: 10px auto 10px;
              justify-content: center;
            "
          >
            <p class="keys-header" v-if="$store.state.keys.priv">
              ⚠️&nbsp; Please backup your
              <b style="color: orange">Private Key</b>
            </p>
            <p class="keys-header" v-else>
              Your <b style="color: orange">Private Key</b> is not here!
            </p>
          </div>
          <div>
            <div class="mt-1 text-lg justify-center items-center">
              <q-icon size="sm" name="bookmark_added" />
              <span class="sf-mono-tight-small"
                >&nbsp;Your posts are published using your
                <b style="color: orange">PRIVATE KEY</b></span
              >
            </div>
            <div class="mt-1 text-lg justify-center items-center">
              <q-icon size="sm" name="devices" />
              <span class="sf-mono-tight-small"
                >&nbsp;Others can find or follow you using your
                <b style="color: lightgreen">PUBLIC KEY</b></span
              >
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <p>
            <b class="spotnik" style="color: orange; font-size: 15px"
              >PRIVATE KEY</b
            >:
          </p>
          <q-input
            style="margin-top: -5px"
            v-model="nsecKey"
            class="mb-2 code-flat"
            readonly
            filled
          >
            <q-btn
              icon="content_copy"
              size="sm"
              flat
              @click="
                copyCode(this.hexToBech32(this.$store.state.keys.priv, 'nsec'))
              "
              class="copy-btn-priv"
            >
              <q-tooltip
                class="tooltip"
                anchor="center left"
                self="center right"
                :offset="[10, 10]"
                >{{ $t("COPY PRIVATE KEY") }}</q-tooltip
              >
            </q-btn>
          </q-input>
          <div style="margin-top: 15px; border-top: 0px solid #b6c6e39f"></div>
          <p>
            <b class="spotnik" style="color: lightgreen; font-size: 15px"
              >PUBLIC KEY</b
            >:
          </p>
          <q-input
            style="margin-top: -5px"
            v-model="npubKey"
            readonly
            filled
            class="code-flat"
          >
            <q-btn
              icon="content_copy"
              size="sm"
              flat
              @click="
                copyCode(this.hexToBech32(this.$store.state.keys.pub, 'npub'))
              "
              class="copy-btn-pub"
            >
              <q-tooltip
                class="tooltip"
                anchor="center left"
                self="center right"
                :offset="[10, 10]"
                >{{ $t("COPY PUBLIC KEY") }}</q-tooltip
              >
            </q-btn>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            icon="close"
            size="md"
            flat
            round
            class="absolute-top-right z-top"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { LocalStorage, copyToClipboard } from 'quasar'
import { nextTick } from 'vue'
import { nip05 } from 'nostr-tools'

import helpersMixin from '../utils/mixin'
// import { setCssVar } from 'quasar'
// import BaseSelect from 'components/BaseSelect.vue'
import BaseSelectMultiple from 'components/BaseSelectMultiple.vue'
import BaseInformation from 'components/BaseInformation.vue'
import ThePreferences from 'components/ThePreferences.vue'
import { createMetaMixin } from 'quasar'
import { utils } from 'lnurl-pay'
import { shortenUrl } from '../utils/helpers'
import MarkdownIt from 'markdown-it'

const metaData = {
  // sets document title
  title: 'Dostr - Settings',

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: 'Nostr &amp; Dostr user configuration',
    },
    keywords: {
      name: 'keywords',
      content: 'nostr dostr decentralized social media siwe siwx',
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
  },
}

export default {
  name: 'Settings',
  mixins: [helpersMixin, createMetaMixin(metaData)],
  emits: ['update-font'],
  components: {
    // BaseSelect,
    BaseSelectMultiple,
    BaseInformation,
    ThePreferences,
  },
  data() {
    return {
      keysDialog: false,
      editingMetadata: false,
      metadata: {},
      showLnAddr: true,
      relays: {},
      editingRelays: false,
      // editingPreferences: false,
      choosingFont: false,
      choosingTheme: false,
      // preferences: {},
      newRelay: '',
      unsubscribe: null,
      hasJustSharedRelay: false,
      petname: '',
      username: '',
      dialogVisible: false,
      markdownContent: '',
      markdownTree: '',
      isLoading: true
    }
  },

  // props: {
  //   showKeys: {
  //     type: Boolean,
  //     default: false
  //   }
  // },

  watch: {
    '$store.state.relays'(curr, prev) {
      if (curr !== prev) this.cloneRelays()
    },
  },
  computed: {
    nickname() {
      return this.petname
    },
    optionalRelays() {
      let options = this.$store.state.optionalRelaysList.filter((relay) => {
        if (
          this.newRelay.length &&
          !relay.toLowerCase().includes(this.newRelay.toLowerCase())
        )
          return false
        if (this.relays[relay]) return false
        return true
      })
      return options
    },
    npubKey() {
      if (this.$store.state.keys.pub)
        return this.hexToBech32(this.$store.state.keys.pub, 'npub')
      return null
    },
    nsecKey() {
      if (this.$store.state.keys.priv)
        return this.hexToBech32(this.$store.state.keys.priv, 'nsec')
      return null
    },
    hasLnAddr() {
      return (
        utils.isLightningAddress(this.metadata.lud06) ||
        (utils.isLnurl(this.metadata.lud06) &&
          this.lnurlToLnAddr(this.metadata.lud06))
      )
    },
    isLnurl() {
      return utils.isLnurl(this.metadata.lud06)
    },
  },

  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'addProfileToCache': {
          if (mutation.payload.pubkey !== state.keys.pub) return
          nextTick(() => {
            setTimeout(() => {
              this.cloneMetadata()
            }, 1)
          })

          break
        }
        // case 'setKeys': {
        //   nextTick(() => {
        //     setTimeout(() => {
        //       this.keysDialog = true
        //     }, 1)
        //   })
        //   break
        // }
      }
    })
    this.cloneRelays()
    //this.loadMarkdownContent('https://gist.githubusercontent.com/sshmatrix/59fccb1279ffe5f0d548f31c5c544246/raw/af847f699ccbe909f4e45b0e70068030ba80f349/LUD-06_ENS.md')
    if (this.$store.state.chainId) {
      if (Object.keys(this.$store.state.relays).length) this.saveRelays()
      this.cloneMetadata()
      let counter = 0
      const intervalId = setInterval(() => {
        if (counter === 5) { // intervals to wait to retrieve profile
          console.log('No profile found; updating profile')
          this.setInfo()
          clearInterval(intervalId)
        } else {
          if (!this.isEmptyOrUnresolved(this.metadata)) {
            console.log('Detected profile')
            clearInterval(intervalId)
          } else {
            console.log(`Making attempt ${counter}/5 to fetch profile...`)
            counter++
          }
        }
      }, 5000)
    } else {
      this.cloneMetadata()
      console.log('No ChainID; non-ETH Login')
    }
    if (!this.$store.state.keys.pub) this.$router.push('/')
    if (this.$store.state.keys.pub && this.$route.params.initUser) {
      nextTick(() => {
        setTimeout(() => {
          this.keysDialog = true
        }, 1000)
      })
    }
  },

  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  },

  methods: {
    openExternalLink(link) {
      window.open(link, '_blank').focus()
    },
    handleMarkdownError(error) {
      console.error('Failed to parse markdown:', error)
    },
    loadMarkdownContent(link) {
      fetch(link)
        .then(response => response.text())
        .then(content => {
          const md = new MarkdownIt()
          this.markdownTree = md.parse(content)
          this.markdownContent = content
        })
        .catch(error => {
          console.error('Failed to load markdown content:', error)
        })
    },
    isEmptyOrUnresolved(proxyObject) {
      const target = proxyObject.__proxy__ ? proxyObject.__proxy__ : proxyObject
      if (Object.keys(target).length === 0) {
        return true
      }
      for (const prop in target) {
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
          return false
        }
      }
      return true
    },
    async setInfo() {
      // this function is triggered after 10 seconds wait
      console.log(this.metadata.picture)
      this.username = this.$store.state.username
      this.petname = this.username.includes('@')
        ? this.username.split('@')[0]
        : this.username
      if (this.username.includes('@')) {
        if (this.metadata.name !== this.petname && this.metadata.nip05 !== this.username) {
          if (this.metadata.created_at) delete this.metadata.created_at
          this.metadata.name = this.petname
          this.metadata.nip05 = this.username.includes('@') ? this.username : ''
          try {
            if (
              (await nip05.queryProfile(this.metadata.nip05)).pubkey !==
              this.$store.state.keys.pub
            ) {
              throw new Error('Failed to verify NIP-05 identifier at endpoint')
            } else {
              this.$q.notify({
                message: '✅ NIP-05 successfully verified 🎉',
                color: 'positive',
                classes: 'notify',
              })
            }
          } catch (error) {
            this.$q.notify({
              message: '⚠️ Failed to verify NIP-05 identifier at endpoint',
              color: 'warning',
              classes: 'notify',
            })
          }
          this.$store.dispatch('setMetadata', this.metadata)
        } else {
          console.log('Profile matches records; retrieved')
        }
      } else {
        if (this.metadata.created_at) delete this.metadata.created_at
        this.metadata.name = this.petname
        this.$store.dispatch('setMetadata', this.metadata)
      }
    },
    copyCode(val) {
      let toCopy = val
      copyToClipboard(toCopy)
        .then(() => {
          // success!
        })
        .catch(() => {
          // fail
        })
    },
    cloneMetadata() {
      this.metadata = Object.assign(
        {},
        this.$store.state.profilesCache[this.$store.state.keys.pub]
      )
      // this.metadata = {name, picture, about, nip05}
      if (this.metadata.lud06) {
        let lnAddr = this.lnurlToLnAddr(this.metadata.lud06)
        if (lnAddr) this.metadata.lud06 = lnAddr
      } else if (this.metadata.lud16) {
        this.metadata.lud06 = this.metadata.lud16
      }
    },
    convertLud06() {
      if (utils.isLightningAddress(this.metadata.lud06))
        this.metadata.lud06 = this.lnAddrToLnurl(this.metadata.lud06)
      else if (
        utils.isLnurl(this.metadata.lud06) &&
        this.lnurlToLnAddr(this.metadata.lud06)
      )
        this.metadata.lud06 = this.lnurlToLnAddr(this.metadata.lud06)
      this.showLnAddr = !this.showLnAddr
    },
    cloneRelays() {
      // this.relays = JSON.parse(JSON.stringify(this.$store.state.relays))
      this.relays = Object.assign(
        {},
        Object.keys(this.$store.state.relays).length
          ? this.$store.state.relays
          : this.$store.state.defaultRelays
      )
    },
    async setMetadata() {
      if (this.metadata.created_at) delete this.metadata.created_at
      if (this.metadata.nip05 === '') this.metadata.nip05 = undefined
      if (this.metadata.nip05) {
        try {
          if (
            (await nip05.queryProfile(this.metadata.nip05)).pubkey !==
            this.$store.state.keys.pub
          )
            throw new Error('Failed to verify NIP-05 identifier at endpoint')
        } catch (error) {
          this.$q.notify({
            message: '⚠️ Failed to verify NIP-05 identifier at endpoint',
            color: 'warning',
            classes: 'notify',
          })
          return
        }
      }

      if (this.metadata.lud06) {
        if (utils.isLightningAddress(this.metadata.lud06)) {
          this.metadata.lud16 = this.metadata.lud06
          this.metadata.lud06 = this.lnAddrToLnurl(this.metadata.lud16)
        } else {
          let lnAddr = this.lnurlToLnAddr(this.metadata.lud06)
          if (lnAddr) this.metadata.lud16 = lnAddr
        }
        if (!utils.isLnurl(this.metadata.lud06)) {
          this.$q.notify({
            message:
              '⚠️ Invalid LUD-06 identifier. LUD-06 identifiers must start with LNURL',
            color: 'warning',
            classes: 'notify',
          })
          return
        }
        if (
          this.metadata.lud16 &&
          !utils.isLightningAddress(this.metadata.lud16)
        ) {
          this.$q.notify({
            message:
              '⚠️ Invalid LUD-16 identifier. LUD-16 identifier must be a Lightning address',
            color: 'warning',
            classes: 'notify',
          })
          return
        }
      }

      if (!Object.keys(this.$store.state.relays).length) this.saveRelays()
      this.$store.dispatch('setMetadata', this.metadata)
      this.editingMetadata = false
    },
    addRelay() {
      if (this.newRelay && this.newRelay.length)
        this.relays[this.newRelay] = { read: true, write: true }
      this.newRelay = ''
    },
    shortUrl(url) {
      return shortenUrl(url)
    },
    removeRelay(url) {
      delete this.relays[url]
    },
    saveRelays() {
      if (!Object.keys(this.relays).length) {
        this.$q
          .dialog({
            title: 'NO RELAYS SAVED!',
            message: '⚠️ You must select at least one relay to broadcast',
            ok: { color: 'accent' },
            class: 'dialog',
          })
          .onOk(() => {
            return
          })
        return
      }
      if (this.$store.getters.canSignEventsAutomatically)
        this.$store.commit('saveRelays', this.relays)
      this.editingRelays = false
    },
    cancel(section) {
      if (section === 'metadata') {
        this.editingMetadata = false
        this.cloneMetadata()
        return
      }
      if (section === 'relays') {
        this.editingRelays = false
        this.cloneRelays()
        return
      }
      // if (section === 'preferences') {
      //   this.editingPreferences = false
      //   this.clonePreferences()
      //   for (let [colorName, color] of Object.entries(this.preferences.color)) this.updateColor(color, colorName)
      //   this.updateFont(this.preferences.font)
      //   return
      // }
    },
    shareRelay(url) {
      this.hasJustSharedRelay = true
      this.$store.dispatch('recommendRelay', url)
      setTimeout(() => {
        this.hasJustSharedRelay = false
      }, 5000)
    },
    async logout() {
      this.$q
        .dialog({
          title: 'LOG OUT?',
          message:
            'ℹ️ This will not delete your local Nostr database and will allow you to login as another user. Continue?',
          cancel: { color: 'accent' },
          ok: { color: 'accent' },
          class: 'dialog',
        })
        .onOk(async () => {
          LocalStorage.clear()
          window.location.href = '/'
        })
    },
    async hardReset() {
      this.$q
        .dialog({
          title: '⚠️ DELETE ALL DATA?',
          message:
            'ℹ️ Do you really want to delete all your data from this device?',
          cancel: { color: 'accent' },
          ok: { color: 'negative' },
          class: 'dialog',
        })
        .onOk(async () => {
          LocalStorage.clear()
          window.location.reload()
        })
    },
    updateFont(font) {
      // this.preferences.font = font
      this.$emit('update-font', font)
    },
  },
}
</script>

<style lang="css" scoped>
.section {
  padding: 0.5rem;
}

.q-card {
  background: linear-gradient(
    75deg,
    rgba(32, 139, 147, 1) 0%,
    rgba(28, 85, 113, 1) 50%,
    rgba(164, 90, 90, 1) 100%
  );
  padding: 0.2rem;
}

.q-dialog .q-dialog__content {
  font-family: "SF Mono", sans-serif;
}
</style>
