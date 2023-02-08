<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Quiz from "./components/Quiz.vue";
import Start from "./components/Start.vue";

export default defineComponent({
  components: {
    HelloWorld,
    Quiz,
    Start,
  },
  setup() {
    // data
    const questions = ref([]);
    const restart = ref(false);
    const amount = ref("5");
    const type = ref("");
    const difficulty = ref("");
    const category = ref("");
    const reset = ref(false);
    const score = ref([]);
    const start = ref(false);
    const check = ref(false);

    // methods
    function startHandler() {
      start.value = true;
      reset.value = false;
    }

    function handleTypeChange(event: { target: { value: string } }) {
      type.value = event.target.value;
    }

    function handleAmountChange(event: { target: { value: string } }) {
      if (isNaN(+event.target.value)) {
        amount.value = "5";
        event.target.value = amount.value; // should i be concerned
      } else if (+event.target.value < 0) {
        amount.value = "5";
        event.target.value = amount.value; // should i be concerned
      } else if (+event.target.value > 50) {
        amount.value = "50";
        console.log(amount.value);
        event.target.value = amount.value; // should i be concerned
        // } else if (event.target.value === ""){
        //     // event.target.value = "1"
        //     amount.value = "1"
      } else {
        amount.value = event.target.value;
        console.log("omooo");
      }
    }

    function handleDifficultyChange(event: { target: { value: any } }) {
      difficulty.value = event.target.value;
    }

    function handleCategoryChange(event: { target: { value: any } }) {
      category.value = event.target.value;
    }
    function handleCheck() {
      check.value = !check.value;
    }
    function handleRestart() {
      restart.value = !restart.value;
      check.value = !check.value;
    }

    // function addScore(s: any) {
    //     score.value = [...score.value, s]
    // }

    function handleReset() {
      reset.value = !reset.value;
      check.value = false;
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
      handleAmountChange,
      handleDifficultyChange,
      handleCategoryChange,
      handleCheck,
      handleRestart,
      handleReset,
    };
  },
  watch: {
    amount(newType, oldType) {
      newType !== oldType ? console.log(newType) : console.log(oldType);
    },
  },
});
</script>

<template>
  <Quiz v-if="start" :msg="[amount, category, type, difficulty]" />

  <Start
    v-else
    :start="startHandler"
    :type="type"
    :amount="amount"
    :difficulty="difficulty"
    :category="category"
    :handleAmountChange="handleAmountChange"
    :handleDifficultyChange="handleDifficultyChange"
    :handleCategoryChange="handleCategoryChange"
    :handleTypeChange="handleTypeChange"
  />
</template>

<style scoped></style>
