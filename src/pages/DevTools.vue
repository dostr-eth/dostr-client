<template>
  <q-page style="margin-top: 15px">
    <BaseHeader style="margin-left: 30px">{{ $t("devTools") }}</BaseHeader>
    <div class="q-py-md q-px-sm">
      <q-tabs v-model="tab" dense outline align="left" active-color="accent">
        <q-tab name="keyConverter" label="key converter" />
        <q-tab name="sqlQuery" label="sql query" />
        <q-tab name="nip05Tester" label="nip-05 Tester" />
      </q-tabs>
      <!-- <div class="text-bold">sql query</div> -->
      <q-tab-panels v-model="tab">
        <q-tab-panel
          name="keyConverter"
          class="flex column items-center full-width"
          style="gap: 0.5rem; background: var(--q-background)"
        >
          <q-input
            v-model="keys.bech32"
            filled
            dense
            label='enter public key ("npub") or event ID ("note") here'
            class="full-width"
          >
            <template #append>
              <BaseButtonCopy color="secondary" :button-text="keys.bech32" />
            </template>
          </q-input>
          <div>- or -</div>
          <div class="flex row no-wrap full-width" style="gap: 1rem">
            <q-input
              v-model="keys.prefix"
              filled
              dense
              label="prefix"
              style="width: 10rem"
            />
            <q-input
              v-model="keys.hex"
              filled
              dense
              label="enter hexadecimal key here"
              class="full-width"
            >
              <template #append>
                <BaseButtonCopy color="secondary" :button-text="keys.hex" />
              </template>
            </q-input>
          </div>
          <q-btn
            spread
            label="convert"
            color="primary"
            outline
            class="full-width q-mt-md"
            @click="convertKeys"
          />
        </q-tab-panel>

        <q-tab-panel name="sqlQuery">
          <TheSqlEditor />
        </q-tab-panel>
        <q-tab-panel name="nip05Tester">
          <q-input
            v-model="nip05Id"
            filled
            dense
            label="enter NIP-05 identifier here"
            class="full-width"
          />
          <q-btn
            spread
            label="test"
            color="primary"
            outline
            class="full-width q-mt-md"
            @click="fetchNip05"
          />
          <pre class="sf-mono" id="nip05-response"></pre>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import helpersMixin from '../utils/mixin'
import { Notify, createMetaMixin } from 'quasar'
import BaseButtonCopy from '../components/BaseButtonCopy'
import TheSqlEditor from '../components/TheSqlEditor'
import { nip05 } from 'nostr-tools'

const metaData = {
  // sets document title
  title: 'Dostr - DevTools',

  // meta tags
  meta: {
    description: {
      name: 'description',
      content: 'Developer tools for Dostr client',
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

export default defineComponent({
  name: 'DevTools',
  mixins: [helpersMixin, createMetaMixin(metaData)],

  components: {
    BaseButtonCopy,
    TheSqlEditor,
    // BaseUserCard,
  },

  data() {
    return {
      codeEditor: null,
      tictime: null,
      sql: 'SELECT * FROM nostr_events;\n-- SELECT * FROM nostr_users;',
      // sql: 'SELECT * FROM nostr;',
      // results: [],
      rows: [],
      // rowKey: 'id',
      // columns: [],
      tab: 'keyConverter',
      keys: {
        hex: '',
        bech32: '',
        prefix: '',
      },
      nip05Id: '',
    }
  },

  methods: {
    convertKeys() {
      if (this.keys.bech32 && this.isBech32Key(this.keys.bech32))
        this.keys.hex = this.bech32ToHex(this.keys.bech32)
      else if (this.keys.hex && this.isKey(this.keys.hex))
        this.keys.bech32 = this.hexToBech32(this.keys.hex, this.keys.prefix)
      else
        Notify.create({
          message: `⚠️ Invalid Key`,
          color: 'negative',
          classes: 'notify',
        })
    },
    // handleError(e) {
    //   let src = e.target.src
    //   let proxySrc = `https://api.codetabs.com/v1/proxy?quest=${src}`
    //   e.target.src = proxySrc
    // }
    async fetchNip05() {
      let profile = await nip05.queryProfile(this.nip05Id)
      // let profile = await nip05.queryProfile(this.nip05Id)
      console.log('NIP-05 Response: ', profile)
      document.querySelector('#nip05-response').innerText = JSON.stringify(
        profile,
        null,
        2
      )
    },
    //  async queryProfile(fullname) {
    //   let [name, domain] = fullname.toLowerCase().split('@')

    //   if (!domain) {
    //     // if there is no @, it is because it is just a domain, so assume the name is "_"
    //     domain = name
    //     name = '_'
    //   }

    //   if (!name.match(/^[a-z0-9-_]+$/)) return null

    //   let res = await (
    //     await fetch(`https://${domain}/.well-known/nostr.json?name=${name}`)
    //   ).json()
    //         console.log('nip05 response', res)

    //   if (!res?.names?.[name]) return null

    //   let pubkey = res.names[name]
    //   let relays = (res.relays?.[pubkey] || []) // nip35

    //   return {
    //     pubkey,
    //     relays
    //   }
    //  }
  },
})
</script>

<style lang="scss" scoped>
.q-tabs {
  border-bottom: 1px solid $accent;
}
</style>
