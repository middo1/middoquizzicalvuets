<script lang="ts">
import { defineComponent, ref } from "vue";
import Quiz from "./components/Quiz.vue";
import Start from "./components/Start.vue";

export default defineComponent({
  components: {
    Quiz,
    Start,
  },
  setup() {
    // data
    const questions = ref([]);
    const restart = ref(false);
    const amount = ref(5);
    const type = ref("");
    const difficulty = ref("");
    const category = ref("");
    const reset = ref(false);
    const score = ref<number[]>([]);
    const start = ref(false);
    const check = ref(false);
    const scor = ref(0)

    // methods
    function startHandler() {
      start.value = true;
      reset.value = false;
    }

    function handleTypeChange(t: string) {
      type.value = t
    }
    
    function handleAmountIncrease(){
      if(amount.value < 50){
        amount.value += 5
      }
    }

    function handleAmountDecrease(){
      if(amount.value > 5){
        amount.value -= 5
      }
    }

    function handleDifficultyChange(d: string) {
      difficulty.value = d
    }

    function handleCategoryChange(c: string) {
      category.value = c
    }
    function handleCheck() {
      check.value = !check.value;
      console.log(check.value)
    }
    function handleRestart() {
      restart.value = !restart.value;
      check.value = !check.value;
    }

    function addScore(s: any) {
        score.value.push(s)
    }

    function showScore() {
      let c = 0
      scor.value = score.value.reduce((a,b) => a+b,c)
    }

    function handleReset() {
      reset.value = !reset.value;
      check.value = false;
    }
    
    function handleBtn(){
      if(check.value){
        handleRestart()
      } else {
        handleCheck()
      }
    }

    async function getQuestions() {
      try {
        questions.value = []
        let res = await fetch(`https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`)
        let data = await res.json()
        questions.value = data.results
      } catch(error) {
        console.log(error)
      }
    }

    return {
      questions,
      restart,
      amount,
      type,
      difficulty,
      category,
      reset,
      score,
      start,
      check,
      startHandler,
      handleTypeChange,
      handleAmountIncrease,
      handleAmountDecrease,
      handleDifficultyChange,
      handleCategoryChange,
      handleCheck,
      handleRestart,
      handleReset,
      getQuestions,
      showScore,
      scor,
      addScore,
      handleBtn
    };
  },
  watch: {
    amount(newType, oldType) {
      this.getQuestions()
    },
    difficulty(newType, oldType) {
      this.getQuestions()
    },
    type(newType, oldType) {
      this.getQuestions()
    },
    category(newType, oldType) {
      this.getQuestions()
    },
    restart(newType, oldType) {
        this.getQuestions()
    },
  },
  created() {
    this.getQuestions()
  },
  updated() {
    this.showScore()
  }
  
});
</script>

<template>
  <div class="container">
    <div class="main">
      <template v-if="start">
        <template v-if="!reset">
          <Quiz v-for="question in questions" :question="question" :check="check" @calc-score="addScore"/>
          <div className="button-container">
            <h1 className="score" v-if="check">
              You scored {{scor}}/{{questions.length}} correct answers
            </h1>
            <div className='btns-container' v-if="questions.length">
              <button 
                class="submit-btn" 
                @click="handleBtn"
              >
              {{check 
              ? "Play again" 
              : "Check answers"
              }}
              </button>
              <button 
                class='submit-btn'
                @click="handleReset"
                >
                    Reset Questions
                </button>
            </div>
            <h1 class="load" v-else>Loading...</h1>
          </div>
        </template>
        <Start
          v-else
          @start-change="startHandler"
          :type="type"
          :amount="amount"
          :difficulty="difficulty"
          :category="category"
          @amount-increase="handleAmountIncrease"
          @amount-decrease="handleAmountDecrease"
          @difficulty-change="handleDifficultyChange"
          @category-change="handleCategoryChange"
          @type-change="handleTypeChange"
        />
      </template>
  
      <Start
        v-else
        @start-change="startHandler"
        :type="type"
        :amount="amount"
        :difficulty="difficulty"
        :category="category"
        @amount-increase="handleAmountIncrease"
        @amount-decrease="handleAmountDecrease"
        @difficulty-change="handleDifficultyChange"
        @category-change="handleCategoryChange"
        @type-change="handleTypeChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
