<template>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
<<<<<<< HEAD
    <q-toolbar-title class="flex justify-center">dostr</q-toolbar-title>
=======
    <q-toolbar-title class="flex justify-center spotnik">dostr</q-toolbar-title>
>>>>>>> dostral-8268ea5
    <q-btn dense flat round icon="groups" @click="toggleRightDrawer" />
  </q-toolbar>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TheToolbar',

  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
    }
  },
})
</script>
