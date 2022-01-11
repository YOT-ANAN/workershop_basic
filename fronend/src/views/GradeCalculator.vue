<template>
  <div>
    <v-container>
      <h3 class="px-4">คำนวณผลการเรียน</h3>
      <v-card class="pa-4">
        <v-text-field
          name="score"
          label="คะแนน"
          id="score"
          type="number"
          v-model.number="score"
          outlined
        ></v-text-field>
        <div class="d-flex justify-end">
          <v-btn @click="calculate(score)" color="success"> คำนวณ </v-btn>
        </div>
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
        alert('กรุณาใส่คะแนนเป็นตัวเลข')
        this.score = 0
      }
      if (score < 0) {
        alert('ข้อมูลกรุณาใส่ข้อมูลในช่วง 0 - 100')
        this.score = 0
      } else if (score <= 49) {
        this.grade = 'F'
        alert('คุณได้เกรด ' + this.grade)
      } else if (score <= 59) {
        this.grade = 'D'
        alert('คุณได้เกรด ' + this.grade)
      } else if (score <= 69) {
        this.grade = 'C'
        alert('คุณได้เกรด ' + this.grade)
      } else if (score <= 79) {
        this.grade = 'B'
        alert('คุณได้เกรด ' + this.grade)
      } else if (score <= 100) {
        this.grade = 'A'
        alert('คุณได้เกรด ' + this.grade)
      } else if (score > 100) {
        alert('ข้อมูลกรุณาใส่ข้อมูลในช่วง 0 - 100')
        this.score = 0
      }
    }
  }
}
</script>

<style>
</style>
