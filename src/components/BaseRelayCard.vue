<template>
  <div class="w-full ml-2">
    <q-card class="cursor-pointer flex row justify-start items-center" flat>
      <q-btn
        rounded
        flat
        color="positive"
        size="md"
        :icon="url in $store.state.relays ? 'check' : 'add'"
        :label="url in $store.state.relays ? 'added' : 'add relay'"
        :disable="url in $store.state.relays"
        @click.stop="addRelay"
      />
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
            title: 'Did you set your first relay?',
            message: `ℹ️ If you are a new user, click PROCEED. If you are a user with existing relay list, Dostr has not been
            able to find it yet. ⚠️ If you hit PROCEED, it will clear your relay list and replace it with this single relay.`,
            cancel: { color: 'negative' },
            ok: { color: 'positive', label: 'PROCEED' },
            class: 'dialog',
          })
          .onOk(() => {
            this.$store.commit('addRelay', this.url)
          })
      } else {
        this.$q
          .dialog({
            title: 'Add new relay?',
            message: `Do you wish to add '${this.url}' to your list of relays?`,
            cancel: { color: 'negative' },
            ok: { color: 'positive' },
            class: 'dialog',
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
  border-radius: 3px;
  border: 3px double var(--q-secondary);
  background: var(--q-background);
}
</style>
