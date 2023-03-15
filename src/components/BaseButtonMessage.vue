<!-- :disable="!$store.getters.canEncryptDecrypt" -->
<template>
  <q-btn
    icon="mail_lock"
    unelevated
    clickable
    :class="buttonClass"
    :size="buttonSize"
    class="button-message"
    :to="buttonTo"
    @click.stop
    dense
  >
    <q-tooltip class="tooltip" anchor="center left" self="center right" :offset="[10, 10]"> ENCRYPTED MESSAGE </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtonMessage',
  props: {
    buttonTo: {
      type: String,
      required: true,
    },
    buttonClass: {
      type: String,
      required: false,
      default: '',
    },
    buttonSize: {
      type: String,
      required: false,
      default: 'sm',
    },
  },

  methods: {
    copy() {
      console.log(this.buttonText)
      navigator.clipboard.writeText(this.buttonText)
    },
  },
})
</script>

<style>
.button-message {
  opacity: 0.6;
  transition: all 0.3s ease-in-out;
}
.button-message:hover {
  opacity: 1;
}
</style>
