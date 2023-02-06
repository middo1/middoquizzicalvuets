<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Quiz from './components/Quiz.vue';
import Start from './components/Start.vue';
export default defineComponent({
  data() {
    return {
      questions: [],
      restart: false,
      amount: "5",
      type: "",
      difficulty: "",
      category: "",
      reset: false,
      score: [],
      start: false,
      check: false
    }
  },
  components: {
    HelloWorld,
    Quiz,
    Start
  },
  methods: {
    startHandler() {
        this.start = true
        this.reset= false
        
    },
    handleTypeChange(event: { target: { value: string; }; }){
        this.type = event.target.value
    },
    handleAmountChange(event: { target: { value: string; }; }){
        
        if (isNaN(+event.target.value)){
          this.amount="5"
          event.target.value = this.amount // should i be concerned
        } else if(+event.target.value < 0) {
            this.amount = "5"
            event.target.value = this.amount // should i be concerned
        } else if (+event.target.value > 50) {
            this.amount = "50"
            console.log(this.amount)
            event.target.value = this.amount // should i be concerned
        // } else if (event.target.value === ""){
        //     // event.target.value = "1"
        //     this.amount = "1"
        } else {
            this.amount = event.target.value
            console.log("omooo")
        }
    },
    handleDifficultyChange(event: { target: { value: any; }; }){
        this.difficulty = event.target.value
    },
    handleCategoryChange(event: { target: { value: any; }; }){
        this.category = event.target.value
    },
    handleCheck() {
        this.check = !this.check
    },
    handleRestart() {
        this.restart = !this.restart
        this.check = !this.check
    },
    // addScore(s: any) {
    //     this.score = [...this.score, s]
    // },
    handleReset() {
        this.reset = !this.reset
        this.check = false
    },
  },
  watch: {
    amount(newType, oldType) {
      newType !== oldType ? console.log(newType) : console.log(oldType)
    }
  }
})
</script>

<template>
  <Quiz v-if="start" :msg="[amount,category, type, difficulty]" />
  <Start v-else 
    :start="startHandler" 
    :type="type" 
    :amount="amount" 
    :difficulty="difficulty" 
    :category="category" 
    :handleAmountChange="handleAmountChange" 
    :handleDifficultyChange="handleDifficultyChange" 
    :handleCategoryChange="handleCategoryChange"
    :handleTypeChange="handleTypeChange" />
</template>

<style scoped>

</style>
