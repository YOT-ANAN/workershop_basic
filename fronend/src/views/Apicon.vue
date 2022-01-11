<template>
  <div>
    <v-container>
      <div class="ma-4">
        <v-btn large outlined color="info" @click="newItem()">ADD</v-btn>
        <!-- <v-btn color="success" @click="getData">Get</v-btn> -->
      </div>

      <v-row>
        <v-col cols="4" v-for="(data, index) in apidata" :key="index">
          <v-card class="mx-auto" max-width="344">
            <!-- <v-img
              src="https://riahsoftware.com/wp-content/uploads/2019/06/System-Programmer.jpg"
              height="200px"
            ></v-img> -->
            <v-img src="https://picsum.photos/500" height="200px"></v-img>

            <v-card-title>
              Name: {{ `${data.firstname} ${data.lastname}` }}
            </v-card-title>

            <v-card-subtitle>
              Gender : {{ data.gender }} <br />
              Age : {{ data.age }} <br />
              <br />

              <v-btn outlined color="info" class="mx-1" @click="editmode(data)"
                >edit</v-btn
              >
              <v-btn
                outlined
                color="error"
                class="mx-1"
                @click="deletemode(data)"
                >delete</v-btn
              >
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialogedit" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ savemode }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <!-- <v-row>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="postdata.username" label="username" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="postdata.password" label="password" ></v-text-field>
              </v-col>
            </v-row> -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="postdata.username"
                    label="username"
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
            <v-btn color="blue darken-1" text @click="dialogedit = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="savedata()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="delDataOne()">OK</v-btn>
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
      id: '',
      apidata: [],
      dialogedit: false,
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
  created() {
    this.getData()
  },
  computed: {
    savemode() {
      return this.id === '' ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    getData() {
      this.axios.get('http://localhost:3000/users').then((response) => {
        this.apidata = response.data.data
      })
    },
    newItem() {
      this.id = ''
      this.postdata = Object.assign({}, this.postdefault)
      this.dialogedit = true
    },
    editmode(item) {
      this.id = item._id
      this.postdata = Object.assign({}, item)
      this.dialogedit = true
    },
    deletemode(item) {
      this.id = item._id
      this.dialogDelete = true
    },
    savedata() {
      console.log(this.savemode)
      if (this.savemode === 'Edit Item') {
        this.putData()
      } else this.postData()
    },
    async postData() {
      try {
        var { data } = await this.axios.post(
          'http://localhost:3000/users',
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialogedit = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async putData() {
      try {
        var { data } = await this.axios.put(
          'http://localhost:3000/users/' + this.id,
          this.postdata
        )
        alert(data.message)
        this.getData()
        this.postdata = Object.assign({}, this.postdefault)
        this.dialogedit = false
      } catch (error) {
        console.log(error.message)
      }
    },
    async delDataOne() {
      try {
        var { data } = await this.axios.delete(
          'http://localhost:3000/users/' + this.id
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
