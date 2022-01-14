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
      <!-- product detail dialog section -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card v-if="selected" class="pa-4">
          <!-- <v-card-title><span>รายละเอียดสินค้า</span></v-card-title> -->
          <v-row>
            <v-col sm="6">
              <v-img src="https://picsum.photos/500" height="500px"></v-img
            ></v-col>
            <v-col sm="6" class="pa-10">
              <div class="text-h6">
                {{ selected.product_name }}
              </div>

              <div class="text-caption py-6">
                <div>COD : {{ selected.product_code }}</div>
                <div>รายละเอียดสินค้า</div>
                <ul>
                  <li
                    v-for="(detail, index) in selected.product_detail"
                    :key="index"
                  >
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <v-card-subtitle>
                <div class="d-flex justify-end text-h6">
                  {{
                    `${
                      selected.price
                        ? `฿ ${selected.price.toLocaleString()}`
                        : selected.price
                    }`
                  }}
                </div>
              </v-card-subtitle>
              <div>
                <v-text-field
                  v-model="amount"
                  label="จำนวน"
                  type="number"
                ></v-text-field>
              </div>
              <div class="d-flex justify-start">
                <v-btn color="error" @click="addToCart(selected)">
                  เพิ่มลงตระกร้า</v-btn
                >
              </div>
            </v-col>
          </v-row>
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
                    {{ `${index + 1} )` }} {{ product.product.product_name }} x
                    {{ product.amount }}
                  </div>
                  <div>
                    {{
                      `฿ ${(
                        product.amount * product.product.price
                      ).toLocaleString()}`
                    }}
                    <v-btn
                      small
                      outlined
                      color="error"
                      class="mx-2"
                      @click="delItemInCart(product.product._id)"
                    >
                      ลบ
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-title><span>ข้อมูลลูกค้า</span></v-card-title>
          <div class="px-6">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="cart.customer.firstname"
                  label="ชื่อ"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="cart.customer.lastname"
                  label="นามสกุล"
                ></v-text-field
              ></v-col>
            </v-row>

            <v-text-field
              v-model="cart.customer.address"
              label="ที่อยู่"
            ></v-text-field>
          </div>
          <div class="d-flex justify-end px-4">
            <v-btn
              color="success"
              :disabled="!cart.product_lists.length"
              @click="confirmOrder"
            >
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
      amount: 1,
      dialog: false,
      dialogCart: false,
      cart: {
        customer: {
          firstname: '',
          lastname: '',
          address: ''
        },
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
        currentList = [
          ...this.cart.product_lists,
          { product: item, amount: this.amount }
        ]
      } else {
        currentList = this.cart.product_lists.map((product) => {
          if (item._id === product.product._id) {
            return { ...product, amount: product.amount + this.amount }
          }
          return product
        })
      }
      this.cart = { ...this.cart, product_lists: currentList }
      this.dialog = false
      this.selected = {}
    },
    detailItem(item) {
      this.amount = 1
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
    delItemInCart(id) {
      const currentList = this.cart.product_lists.filter((product) => {
        if (id !== product.product._id) return product
      })
      this.cart = { ...this.cart, product_lists: currentList }
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
