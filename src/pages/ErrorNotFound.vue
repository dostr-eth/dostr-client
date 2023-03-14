<template>
  <!-- <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div> -->
  <q-page class="flex-center">
    <div style="display: flex; margin: 0 auto; justify-content: center;">
      <div style="font-size: 30vh">404</div>
    </div>
    <div style="display: flex; margin: 0 auto; justify-content: center;">
      <div class="text-h2" style="opacity: 0.4">
        {{ $t("404: Source Not Found") }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { createMetaMixin } from 'quasar'

const metaData = {
  // sets document title
  title: 'Dostr - 404 Page Not Found',
}

export default defineComponent({
  name: 'ErrorNotFound',
  mixins: [createMetaMixin(metaData)],
})
</script>
