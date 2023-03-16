<template>
  <q-btn
:class="buttonClass + (isFollowing ? 'button-unfollow' : 'button-follow')" :size="buttonSize" unelevated
    :text-color="isFollowing ? '' : 'secondary'" dense @click.stop="toggleFollowing">
    <q-icon :name="isFollowing ? 'person_remove' : 'person_add'" :class="isFollowing ? 'flip-horizontal' : ''" />
<<<<<<< HEAD
<<<<<<< HEAD
    <q-tooltip>
      {{ isFollowing ? "unfollow" : "follow" }}
=======
    <q-tooltip class="tooltip">
=======
    <q-tooltip class="tooltip" anchor="center left" self="center right" :offset="[10, 10]">
>>>>>>> dostral
      {{ isFollowing ? "unfollow".toUpperCase() : "follow".toUpperCase() }}
>>>>>>> dostral-8268ea5
    </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtonFollow',
  props: {
    pubkey: {
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

  computed: {
    isFollowing() {
      return this.$store.state.follows.includes(this.pubkey)
    },
  },

  methods: {
    toggleFollowing() {
      if (!this.$store.state.follows.length) {
        this.$q
          .dialog({
            title: 'set your first follow?'.toUpperCase(),
            message: `✅ If you are a new user, click PROCEED.</br>⚠️ If you are a user who already has a 'Follows' list, Dostr has not been
            able to find it yet.</br>❌ If you hit PROCEED, it will clear your 'Follows' list and replace it with this single follow.`,
            cancel: { color: 'accent' },
            ok: { color: 'accent', label: 'proceed' },
            html: true,
          })
          .onOk(() => {
            this.follow()
          })
      } else {
        if (this.isFollowing) this.unfollow()
        else this.follow()
      }
    },
    unfollow() {
      this.$store.commit('unfollow', this.pubkey)
    },

    follow() {
      this.$store.commit('follow', this.pubkey)
    },
  },
})
</script>

<style lang="scss" scoped>
.button-follow
.button-unfollow {
  opacity: 0.6;
  transition: all 0.3s ease-in-out;
}

.button-follow:hover {
  opacity: 1;
}

.button-unfollow:hover {
  opacity: 1;
  color: $negative;
}
</style>
