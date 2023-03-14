<template>
  <q-btn unelevated clickable :size="buttonSize" class="button-set-user" dense style="margin-left: -10px;">
    <div v-if="verbose" class="gt-sm" style="font-size: 1rem; font-weight: 700; letter-spacing: 0.05rem;">
<<<<<<< HEAD
      <span>&nbsp;{{ $t("Sign In") }}&nbsp;</span>
=======
      <span>&nbsp;{{ $t("Login") }}&nbsp;</span>
>>>>>>> dostral-8268ea5
    </div>
    <q-icon name="login" color="primary" :size="buttonSize" />
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtonSetUser',
  props: {
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
.button-set-user {
  opacity: 1;
  font-family: 'Spotnik';
  background: green;
}

.button-set-user:hover {
  opacity: 1;
  transform: scale(1.1);
  transform-origin: right;
}
</style>
