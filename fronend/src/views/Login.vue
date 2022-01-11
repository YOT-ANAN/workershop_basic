<template>
  <div>
    <h1>{{ data }}</h1>
    <h1 v-if="show">{{ show }}</h1>
    <v-btn color="success" @click="show = !show">switch</v-btn>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ index + 1 }}
        {{ item.message }}
        {{ item.address }}
      </li>
    </ul>
    <v-btn color="success" @click="display(username)"> alert </v-btn>
    <v-text-field
      name="username"
      label="username"
      id="username"
      v-model="username"
    >
    </v-text-field>
    <v-btn color="success" @click="callSub()"> from main to sub </v-btn>
    <SubLogin :dataprops="username" />
  </div>
</template>

<script>
import SubLogin from './SubLogin.vue'
import { EventBus } from '@/EventBus'
export default {
  components: {
    SubLogin
  },
  data() {
    return {
      data: 'Hello From Login',
      show: false,
      username: '',
      items: [
        { message: 'Foo', address: '251' },
        { message: 'Bar', address: '163' }
      ]
    }
  },
  mounted() {
    EventBus.$on('maindisplay', this.mainDisplay)
  },
  methods: {
    display(message) {
      alert('Hello from ' + message)
    },
    mainDisplay() {
      alert('Hello from main')
    },
    callSub() {
      EventBus.$emit('subdisplay', this.username)
    }
  }
}
</script>

<style>
</style>
