<template>
  <div>
    <v-container>
      <h3 class="px-4">คำนวณผลการเรียน</h3>
      <v-card class="px-4 py-4">
        <v-text-field
          name="score"
          label="คะแนน"
          id="score"
          type="number"
          v-model.number="score"
          outlined
        ></v-text-field>
        <v-btn @click="calculate(score)" color="success"> คำนวณ </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      grade: ''
    }
  },
  methods: {
    calculate(score) {
      if (typeof score !== 'number') {
        alert('กรุณากรอกคะแนนเป็นตัวเลข')
        return
      }
      if (score < 0) alert('ข้อมูลกรุณาใส่ข้อมูลในช่วง 0 - 100')
      else if (score <= 49) {
        this.grade = 'F'
        alert('เกรดของคุณคือ ' + this.grade)
      } else if (score <= 59) {
        this.grade = 'D'
        alert('เกรดของคุณคือ ' + this.grade)
      } else if (score <= 69) {
        this.grade = 'C'
        alert('เกรดของคุณคือ ' + this.grade)
      } else if (score <= 79) {
        this.grade = 'B'
        alert('เกรดของคุณคือ ' + this.grade)
      } else if (score <= 100) {
        this.grade = 'A'
        alert('เกรดของคุณคือ ' + this.grade)
      } else if (score > 100) {
        alert('ข้อมูลกรุณาใส่ข้อมูลในช่วง 0 - 100')
      }
    }
  }
}
</script>

<style>
</style>
