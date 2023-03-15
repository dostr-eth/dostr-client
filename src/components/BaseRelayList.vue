<template>
  <div>
    <div>
      <span class="text-bold spotnik" style="font-size: 1.1rem">relays</span>
      &nbsp;
      <span class="text-secondary spotnik">
        <q-icon name="visibility" size="xs" dense />
        seen
      </span>
      &nbsp;
      <span class="spotnik">
        <q-icon name="visibility_off" size="xs" dense />
        not seen
      </span>
    </div>
    <div style="overflow-x: scroll">
      <pre class="relay-list">
        <div v-if="event?.seen_on?.length" class='text-secondary' style='overflow: hidden;'>
          <div v-for="relay in event.seen_on" :key="relay" class='relay-item hide-scrollbar'>
            <q-icon name='visibility' size='xs'/>
            {{ relay }}
          </div>
        </div>
        <div v-if="missingFrom.length"  style='overflow: hidden;'>
          <div v-for="relay in missingFrom" :key="relay" class='relay-item unseen-relay-item hide-scrollbar' clickable>
            <q-btn
              icon='visibility'
              flat
              unelevated
              color="secondary"
              size="sm"
              class='no-padding'
              dense
              @click="publishTo(relay)"
            />
            <q-icon
              name='visibility_off'
              size='xs'
              clickable
            />
            {{ relay }}
          </div>
        </div>
      </pre>
    </div>
  </div>
</template>

<script>
import { publish } from '../query'
import helpersMixin from '../utils/mixin'
import { cleanEvent } from '../utils/event'

export default {
  name: 'BaseRelayList',
  mixins: [helpersMixin],
  props: { event: { type: Object, required: true } },

  computed: {
    missingFrom() {
      // filter out events we don't have locally as they are from people we don't follow
      if (!this.event || !this.event.seen_on) return []

      return Object.entries(this.$store.state.relays)
        .filter(([_, prefs]) => prefs.write)
        .map(([url, _]) => url)
        .filter((url) => this.event.seen_on.indexOf(url) === -1)
    },
  },
  methods: {
    publishTo(relayURL) {
      console.log('publish event', this.event)
      let relays = [relayURL]
      publish(cleanEvent(this.event), relays)
    },
  },
}
</script>

<style lang="scss" scoped>
.relay-list {
  column-width: auto;
  column-gap: 0;
  width: auto;
  max-height: 100px;
  min-height: 1px;
  font-size: 0.8rem;
  white-space: nowrap;
}
.relay-item {
  overflow: auto;
}
.unseen-relay-item .q-btn {
  display: none;
  visibility: hidden;
  opacity: 0.6;
}
.unseen-relay-item:hover .q-btn {
  display: unset;
  visibility: visible;
}
.unseen-relay-item:hover .q-btn:hover {
  opacity: 1;
}
.unseen-relay-item:hover .q-icon {
  display: none;
  visibility: hidden;
}
</style>
