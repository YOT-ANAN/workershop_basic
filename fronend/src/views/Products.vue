<template>
  <div>
    <v-container>
      <div class="my-4 mx-1">
        <div class="d-flex justify-space-between">
          <h3>รายการสินค้า</h3>
          <div>
            <v-btn color="info" @click="showCart">ตระกร้าสินค้า</v-btn>
          </div>
        </div>
      </div>
      <v-row>
        <v-col sm="6" lg="3" v-for="(product, index) in products" :key="index">
          <ProductCard :product="product" :detailItem="detailItem" />
        </v-col>
      </v-row>
      <!-- product detail section -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card v-if="selected" class="pa-2">
          <v-card-title><span>รายละเอียดสินค้า</span></v-card-title>
          <v-img src="https://picsum.photos/500" height="200px"></v-img>
          <v-card-title>
            <div>
              {{ selected.product_name }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="d-flex justify-end"></div>
          </v-card-subtitle>
          <v-card-subtitle>
            <div class="d-flex justify-end">
              {{ `${selected.price ? selected.price.toLocaleString() : selected.price} บาท` }}
            </div>
          </v-card-subtitle>
          <div class="d-flex justify-start px-4">
            <v-btn small outlined color="error" @click="addToCart(selected)">
              เพิ่มลงตระกร้า</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
      <!-- order detail section -->
      <v-dialog v-model="dialogCart" max-width="500px">
        <v-card class="pa-2">
          <v-card-title><span>ตระกร้าสินค้า</span></v-card-title>
          <v-card-text>
            <div>รายการสินค้า</div>
            <v-row class="my-2">
              <v-col
                sm="12"
                v-for="(product, index) in this.cart.product_lists"
                :key="index"
              >
                <div class="d-flex justify-space-between px-2">
                  <div>
                    {{ `${index + 1} )` }} {{ product.product.product_name }}
                  </div>
                  <div>{{ product.amount }} ชิ้น</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <div class="d-flex justify-end px-4">
            <v-btn small outlined color="success" @click="confirmOrder">
              จ่ายเงิน</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      dialog: false,
      dialogCart: false,
      cart: {
        product_lists: []
      },
      selected: null
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      this.axios.get('http://localhost:3000/products').then((res) => {
        const { data } = res.data
        this.products = data
      })
    },
    addToCart(item) {
      let currentList = []
      const isAvaliable = this.cart.product_lists.find(
        (product) => product.product._id === item._id
      )
      if (!isAvaliable) {
        currentList = [...this.cart.product_lists, { product: item, amount: 1 }]
      } else {
        currentList = this.cart.product_lists.map((product) => {
          if (item._id === product.product._id) {
            return { ...product, amount: product.amount + 1 }
          }
          return product
        })
      }
      this.cart = { ...this.cart, product_lists: currentList }
      this.dialog = false
      this.selected = {}
    },
    detailItem(item) {
      this.id = ''
      this.selected = Object.assign({}, item)
      this.dialog = true
    },
    showCart() {
      if (this.cart.product_lists.length) {
        this.dialogCart = true
      } else {
        alert('กรุณาเลือกสินค้าอย่างน้อย 1 รายการลงตระกร้า')
      }
    },
    async confirmOrder() {
      try {
        var { data } = await this.axios.post(
          'http://localhost:3000/orders',
          this.cart
        )
        alert(data.message)
        this.getData()
        this.dialogCart = false
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
</style>
