<template>
  <div class="my-2">
    <div>{{ dataprops }}</div>
    <v-btn color="success" @click="callmain()"> from sub to main </v-btn>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
  props: ['dataprops'],
  mounted() {
    EventBus.$on('subdisplay', this.subdisplay)
  },
  methods: {
    subdisplay(message) {
      alert('Hello Sub' + message)
    },
    callmain() {
      EventBus.$emit('maindisplay')
    }
  }
}
</script>

<style>
</style>
