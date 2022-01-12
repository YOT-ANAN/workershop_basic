<template>
  <div>
    <v-container>
      <div class="my-4 mx-1">
        <h3>รายการสินค้า</h3>
      </div>
      <v-row>
        <v-col sm="6" lg="3" v-for="(product, index) in products" :key="index">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  components: { ProductCard },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios.get('http://localhost:3000/products').then((res) => {
        const { data } = res.data
        this.products = data
      })
    }
  }
}
</script>

<style>
</style>
