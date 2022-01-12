<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://picsum.photos/500" height="200px"></v-img>

      <v-card-title>
        <div>
          {{ product.product_name }}
        </div>
      </v-card-title>

      <v-card-subtitle>
        <div class="d-flex justify-end">
          {{ `${product.price.toLocaleString()} บาท` }}
        </div>
        <div v-if="admin" class="d-flex justify-start ">
          ยอดคงเหลือ
          <p class="px-2">{{ product.amount }}</p>
          ชิ้น
        </div>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['product', 'admin']
}
</script>

<style>
</style>
