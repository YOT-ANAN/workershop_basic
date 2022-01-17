<template>
  <div>
    <HelloWorld />
    <div>
      <div>learn vuex</div>
      {{ $store.getters.getCount }}
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',
  mounted() {

  },

  components: {
    HelloWorld
  }
}
</script>
