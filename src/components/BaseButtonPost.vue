<template>
  <q-btn
    unelevated
    clickable
    :size="buttonSize"
    class="button-post"
    dense
    @click="$emit('open')"
  >
    <div
      v-if="verbose"
<<<<<<< HEAD
      class="gt-sm"
=======
      class="gt-sm spotnik"
>>>>>>> dostral-8268ea5
      style="font-size: 1rem; font-weight: 700; letter-spacing: 0.05rem"
    >
      <span v-if="!isOpen">&nbsp;{{ $t("post") }}&nbsp;</span>
      <span v-if="isOpen">&nbsp;{{ $t("close") }}&nbsp;</span>
    </div>
    <q-icon
      :name="isOpen ? 'close' : 'chat_bubble_outline'"
      :class="verbose ? '' : 'flip-horizontal'"
      :color="isOpen ? '' : 'primary'"
      :size="buttonSize"
    />
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtonPost',
  emits: ['open'],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    // buttonColor: {
    //   type: String,
    //   required: false,
    //   default: ''
    // },
    // buttonClass: {
    //   type: String,
    //   required: false,
    //   default: ''
    // },
    buttonSize: {
      type: String,
      required: false,
      default: 'sm',
    },
    verbose: {
      type: Boolean,
      default: false,
    },
  },

  // methods: {
  //   info() {
  //     console.log(this.buttonText)
  //     navigator.clipboard.writeText(this.buttonText)
  //   }
  // }
})
</script>

<style>
.button-post {
  opacity: 0.8;
}
.button-post:hover {
  opacity: 1;
}
</style>
