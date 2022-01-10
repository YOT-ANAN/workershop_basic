<template>
  <div>
    <h1>{{ data }}</h1>
    <h1 v-if="show">{{ show }}</h1>
    <v-btn color="success" @click="show = !show">switch</v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: 'Hello From Login',
      show: false
    }
  }
}
</script>

<style>
</style>
