<template>
  <div
    style="margin-right: 10px; margin-left: 5px;"
    :class="
      (bordered ? 'bordered-avatar' : '') +
      (hoverEffect ? ' hovered-avatar' : '')
    "
  >
    <q-avatar
      :rounded="!round"
      class="relative-position"
      :size="size"
      @click.stop="toProfile(pubkey)"
    >
      <img :src="$store.getters.avatar(pubkey)" loading="lazy" async />
      <div :class="alignRight ? 'icon-right' : 'icon-left'" class="q-pt-xs">
        <BaseButtonNIP05
          v-if="showVerified"
          :pubkey="pubkey"
          button-size="xs"
        />
      </div>
    </q-avatar>
  </div>
</template>

<script>
import helpersMixin from '../utils/mixin'
import BaseButtonNIP05 from 'components/BaseButtonNIP05.vue'

export default {
  mixins: [helpersMixin],
  components: {
    BaseButtonNIP05,
  },
  props: {
    pubkey: { type: String, required: true },
    alignRight: { type: Boolean, default: true },
    size: { type: String, default: '' },
    round: { type: Boolean, default: false },
    bordered: { type: Boolean, default: true },
    showVerified: { type: Boolean, default: true },
    hoverEffect: { type: Boolean, default: false },
  },
}
</script>

<style lang="css" scoped>
.bordered-avatar .q-avatar img {
  border: 2px solid var(--q-accent);
  background: var(--q-background);
  z-index: 1;
}
.hovered-avatar .q-avatar:hover {
  transform: scale(1.25) translateX(0.25rem);
}
.icon-right {
  position: absolute;
  top: -0.4rem;
  right: -0.5rem;
}
.icon-left {
  position: absolute;
  top: -0.4rem;
  left: -0.5rem;
}
</style>
