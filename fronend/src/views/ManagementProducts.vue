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
          <ProductCard :product="product" :admin="true" :editItem="editItem" />
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>{{ isNewProduct }}</span>
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
                <v-col cols="12">
                  <v-text-field
                    v-model="postdata.product_detail.colour"
                    label="สี"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="postdata.price"
                    label="ราคา"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="postdata.amount"
                    label="จำนวน"
                    type="number"
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
            <v-btn color="green darken-1" text @click="saveData()"
              >บันทึก</v-btn
            >
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
        product_name: '',
        product_detail: {
          colour: ''
        },
        price: 0,
        amount: 0
      },
      postdefault: {
        product_name: '',
        product_detail: {
          colour: ''
        },
        price: 0,
        amount: 0
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
    },
    editItem(item) {
      this.id = item._id
      this.postdata = Object.assign({}, item)
      this.dialog = true
    },
    saveData() {
      console.log(this.isNewProduct)
      if (this.isNewProduct === 'แก้ไขสินค้า') {
        alert('แก้ไขสินค้า')
        this.putData()
      } else this.postData()
    },
    async postData() {
      try {
        var { data } = await this.axios.post(
          'http://localhost:3000/products',
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialoge = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async putData() {
      try {
        var { data } = await this.axios.put(
          'http://localhost:3000/products/' + this.id,
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialog = false
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
</style>
