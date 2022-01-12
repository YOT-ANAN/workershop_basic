<template>
  <div>
    <v-container>
      <div class="my-4 mx-1">
        <h3>จัดการรายการสินค้า</h3>
      </div>
      <div class="my-4 d-flex justify-end">
        <v-btn medium outlined color="info" @click="newItem()">เพิ่ม</v-btn>
      </div>
      <v-row>
        <v-col sm="6" lg="3" v-for="(product, index) in products" :key="index">
          <ProductCard :product="product" :admin="true" />
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span >{{ isNewProduct }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="postdata.product_name"
                    label="ชื่อสินค้า"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.password"
                    label="password"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.firstname"
                    label="firstname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.lastname"
                    label="lastname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.gender"
                    label="gender"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.age"
                    label="age"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >ยกเลิก</v-btn
            >
            <v-btn color="blue darken-1" text @click="savedata()">บันทึก</v-btn>
          </v-card-actions>
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
      id: '',
      dialog: false,
      dialogDelete: false,
      postdata: {
        product_name: ''
      },
      postdefault: {
        product_name: ''
      }
    }
  },
  computed: {
    isNewProduct() {
      return this.id === '' ? 'เพิ่มสินค้า' : 'แก้ไขสินค้า'
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
    },
    newItem() {
      this.id = ''
      this.postdata = Object.assign({}, this.postdefault)
      this.dialog = true
    }
  }
}
</script>

<style>
</style>
