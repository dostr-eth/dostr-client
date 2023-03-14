<template>
  <div class="w-full ml-2">
    <q-card class="cursor-pointer flex row justify-start items-center" flat>
      <q-btn
<<<<<<< HEAD
rounded flat color="primary" size="md" :icon="url in $store.state.relays ? 'check' : 'add'"
=======
rounded flat color="positive" size="md" :icon="url in $store.state.relays ? 'check' : 'add'"
>>>>>>> dostral-8268ea5
        :label="url in $store.state.relays ? 'added' : 'add relay'" :disable="url in $store.state.relays"
        @click.stop="addRelay" />
      <div class="text-bold">{{ cleanUrl }}</div>
    </q-card>
  </div>
</template>

<script>
import * as DOMPurify from 'dompurify'

export default {
  name: 'BaseRelayCard',
  props: {
    url: { type: String, required: true },
  },
  computed: {
    cleanUrl() {
      return DOMPurify.sanitize(this.url)
    },
  },
  methods: {
    addRelay() {
      if (!Object.keys(this.$store.state.relays).length) {
        this.$q
          .dialog({
<<<<<<< HEAD
            title: 'set your first relay?',
            message: `if you are a new user click proceed. if you are a user that already has a relay list, astral has not been
            able to find it yet. if you hit proceed it will clear your relay list and replace it with this single relay.`,
            cancel: { color: 'accent' },
            ok: { color: 'accent', label: 'proceed' },
=======
            title: 'Did you set your first relay?',
            message: `If you are a new user, click PROCEED. If you are a user with existing relay list, Dostr has not been
            able to find it yet. If you hit PROCEED, it will clear your relay list and replace it with this single relay.`,
            cancel: { color: 'negative' },
            ok: { color: 'positive', label: 'PROCEED' },
>>>>>>> dostral-8268ea5
          })
          .onOk(() => {
            this.$store.commit('addRelay', this.url)
          })
      } else {
        this.$q
          .dialog({
<<<<<<< HEAD
            title: 'Add relay?',
            message: `Add ${this.url} to your list of relays?`,
            cancel: { color: 'accent' },
            ok: { color: 'accent' },
=======
            title: 'Add new relay?',
            message: `Add ${this.url} to your list of relays?`,
            cancel: { color: 'negative' },
            ok: { color: 'positive' },
>>>>>>> dostral-8268ea5
          })
          .onOk(() => {
            this.$store.commit('addRelay', this.url)
          })
      }
    },
  },
}
</script>

<style lang="css" scoped>
.q-card {
<<<<<<< HEAD
=======
  border-radius: 3px;
>>>>>>> dostral-8268ea5
  border: 3px double var(--q-secondary);
  background: var(--q-background);
}
</style>
