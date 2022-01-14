<template>
  <div>
    <v-container>
      <div class="my-4 mx-1">
        <h3>จัดการรายการสั่งซื้อ</h3>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="orders"
          sort-by="calories"
          class="elevation-1"
        >
          <template>
            <v-toolbar flat> </v-toolbar>
          </template>

          <template v-slot:[`item.createdAt`]="{ item }">
            <div>
              {{ new Date(item.createdAt).toLocaleDateString('th') }}
            </div>
          </template>
          <template v-slot:[`item.customer`]="{ item }">
            <div>
              {{ item.customer.firstname }} {{ item.customer.lastname }}
              <div>
                {{ item.customer.address }}
              </div>
            </div>
          </template>
          <template v-slot:[`item.product_lists`]="{ item }">
            <div
              class="my-2"
              v-for="(product, index) in item.product_lists"
              :key="index"
            >
              {{ product.product.product_name }} x {{ product.amount }} ชิ้น
            </div>
          </template>
          <template v-slot:[`item.total_amount`]="{ item }">
            <div>{{ item.total_amount.toLocaleString() }} ชิ้น</div>
          </template>
          <template v-slot:[`item.total_price`]="{ item }">
            <div>{{ item.total_price.toLocaleString() }} บาท</div>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [],
      headers: [
        {
          text: 'วันที่',
          value: 'createdAt',
          sortable: false
        },
        {
          text: 'ที่อยู่ลูกค้า',
          value: 'customer',
          sortable: false
        },
        {
          text: 'รายการสินค้า',
          value: 'product_lists',
          sortable: false
        },
        {
          text: 'จำนวน',
          value: 'total_amount',
          sortable: false
        },
        {
          text: 'ราคา',
          value: 'total_price',
          sortable: false
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios.get('http://localhost:3000/orders').then((res) => {
        const { data } = res.data
        this.orders = data
      })
    }
  }
}
</script>

<style>
</style>
