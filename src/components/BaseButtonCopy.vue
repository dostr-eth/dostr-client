<template>
  <q-btn
    v-if="buttonText"
    icon="content_copy"
    unelevated
    clickable
    @click="copy"
    :class="'' + buttonClass"
    :size="buttonSize"
    class="button-copy"
    dense
    :label="verbose || buttonLabel ? buttonLabel || 'copy' : ''"
    align="left"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      class="tooltip"
      v-if="tooltipText"
    >
      {{ tooltipText }}
    </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'
import helpersMixin from '../utils/mixin'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'BaseButtonCopy',
  mixins: [helpersMixin],
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: null,
    },
    buttonClass: {
      type: String,
      required: false,
      default: '',
    },
    buttonSize: {
      type: String,
      required: false,
      default: 'md',
    },
    verbose: {
      type: Boolean,
      default: false,
    },
    tooltipText: {
      type: String,
      required: false,
      default: '',
    },
    element: {
      type: Object,
      default: null,
    },
  },
  computed: {
    copyText() {
      let selection = this.element?.getSelection()?.toString()
      if (selection) {
        return selection
      } else return this.buttonText
    },
  },

  methods: {
    async copy() {
      let text = this.copyText
      console.log(text)
      await navigator.clipboard.writeText(text)
      Notify.create({
        message: `ℹ️ Copied ${
          this.copyText.length < 70
            ? this.copyText
            : this.shorten(this.copyText, 30)
        }`,
        classes: 'notify',
      })
    },
  },
})
</script>

<style>
.button-copy {
  opacity: 1;
  transition: all 0.3s ease-in-out;
}
.button-copy:hover {
  opacity: 1;
}
</style>
