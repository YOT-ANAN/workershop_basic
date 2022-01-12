<template>
  <div>
    <v-container>
      <div class="my-4 mx-1">
        <h3>จัดการผู้ใช้</h3>
      </div>
      <div class="my-4 d-flex justify-end">
        <v-btn medium outlined color="info" @click="newItem()">เพิ่ม</v-btn>
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

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
      <!-- <v-row>
        <v-col sm="6" lg="3" v-for="(orders, index) in orders" :key="index">
          {{ orders.firstname }}

          <ProductCard
            :product="product"
            :admin="true"
            :editItem="editItem"
            :deleteItem="deleteItem"
          />
        </v-col>
      </v-row> -->
      <!-- create or edit dialog section -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>{{ isNewData }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.username"
                    label="ชื่อผู้ใช้"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.password"
                    label="รหัสผ่าน"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.firstname"
                    label="ชื่อ"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.lastname"
                    label="นามสกุล"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.gender"
                    label="เพศ"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.age"
                    label="อายุ"
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
      <!-- delete dialog section -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title><span>ยืนยันการลบผู้ใช้ ?</span></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false"
              >ยกเลิก</v-btn
            >
            <v-btn color="error darken-1" text @click="delDataOne()"
              >ยืนยัน</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          text: 'ชื่อ',
          value: 'firstname'
        },
        {
          text: 'นามสกุล',
          value: 'lastname'
        },
        { text: 'เพศ', value: 'gender' },
        { text: 'อายุ', value: 'age' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      id: '',
      dialog: false,
      dialogDelete: false,
      postdata: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
        age: ''
      },
      postdefault: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
        age: ''
      }
    }
  },
  computed: {
    isNewData() {
      return this.id === '' ? 'เพิ่มผู้ใช้' : 'แก้ไขผู้ใช้'
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
    deleteItem(item) {
      this.id = item._id
      this.dialogDelete = true
    },
    saveData() {
      if (this.isNewData === 'แก้ไขผู้ใช้') {
        this.putData()
      } else this.postData()
    },
    async postData() {
      try {
        var { data } = await this.axios.post(
          'http://localhost:3000/orders',
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialog = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async putData() {
      try {
        var { data } = await this.axios.put(
          'http://localhost:3000/orders/' + this.id,
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialog = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async delDataOne() {
      try {
        var { data } = await this.axios.delete(
          'http://localhost:3000/orders/' + this.id
        )
        alert(data.message)
        this.getData()
        this.id = ''
        this.dialogDelete = false
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
</style>
