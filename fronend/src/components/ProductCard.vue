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
        <div v-if="admin">
          <div class="d-flex justify-start">
            ยอดคงเหลือ
            <p class="px-2">{{ product.amount }}</p>
            ชิ้น
          </div>
          <div>
            <v-btn outlined color="warning" small @click="editItem(product)">
              แก้ไขสินค้า
            </v-btn>
          </div>
        </div>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['product', 'admin', 'editItem']
}
</script>

<style>
</style>
