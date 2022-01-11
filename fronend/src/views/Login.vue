<template>
  <div>
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
    <div>
      {{ $store.state.count }}
    </div>
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
      datas: [],
      show: false,
      username: '',
      items: [
        { message: 'Foo', address: '251' },
        { message: 'Bar', address: '163' }
      ]
    }
  },
  async created() {
    await this.getData()
    console.log('created')
  },
  mounted() {
    console.log('mounted')
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
    },
    async getData() {
      try {
        const { data } = await this.axios.get('https://localhost:3000/product')
        console.log(data)
        this.datas = data
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
</style>
