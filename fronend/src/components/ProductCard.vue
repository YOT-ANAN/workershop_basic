<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <!-- <router-link
        style="text-decoration: none; color: inherit"
        :to="`/product/${product._id}`"
      > -->
      <div style="cursor: pointer" v-show="!admin" @click="detailItem(product)">
        <v-img src="https://picsum.photos/500" height="200px"></v-img>
        <v-card-title>
          <div>
            {{ product.product_name }}
          </div>
        </v-card-title>
      </div>

      <div v-show="admin">
        <v-img src="https://picsum.photos/500" height="200px"></v-img>
        <v-card-title>
          <div>
            {{ product.product_name }}
          </div>
        </v-card-title>
      </div>

      <div>
        <v-card-subtitle>
          รายละเอียดสินค้า : สี{{ product.product_detail.colour }}
        </v-card-subtitle>
      </div>
      <!-- </router-link> -->
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
          <div class="d-flex justify-space-between">
            <v-btn color="warning" small @click="editItem(product)">
              แก้ไขสินค้า
            </v-btn>
            <v-btn outlined color="error" small @click="deleteItem(product)">
              ลบ
            </v-btn>
          </div>
        </div>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['product', 'admin', 'editItem', 'deleteItem', 'detailItem']
}
</script>

<style>
</style>
