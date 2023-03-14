<template>
  <q-page class="fit flex column no-wrap">
    <TheSearchMenu />
  </q-page>
</template>

<script>
import TheSearchMenu from 'components/TheSearchMenu.vue'
import { createMetaMixin } from 'quasar'

const metaData = {
  // sets document title
<<<<<<< HEAD
  title: 'Dostr - search, follows',
=======
  title: 'Dostr - Search Follows',
>>>>>>> dostral-8268ea5

  // meta tags
  meta: {
    description: {
      name: 'description',
<<<<<<< HEAD
      content: 'Nostr search and follows on Dostr',
    },
    keywords: { name: 'keywords', content: 'nostr decentralized social media' },
=======
      content: 'Nostr Search and Follows on Dostr',
    },
    keywords: { name: 'keywords', content: 'nostr dostr decentralized social media siwe siwx' },
>>>>>>> dostral-8268ea5
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
  },
}

export default {
  name: 'SearchFollow',
  mixins: [createMetaMixin(metaData)],
  components: {
    TheSearchMenu,
  },
}
</script>
