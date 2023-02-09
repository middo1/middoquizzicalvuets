e<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(props, {emit}) {


    function handleStartChange() {
      emit("startChange")
    }

    function amountIncrease(event : any) {
      emit("amountIncrease")
    }

    function amountDecrease(event : any) {
      emit("amountDecrease")
    }

    function typeChange(event: any) {
      emit("typeChange", event.target.value)
    }

    function categoryChange(event: any) {
      emit("categoryChange", event.target.value)
    }

    function difficultyChange(event: any) {
      emit("difficultyChange", event.target.value)
    }
    return {
      handleStartChange,
      amountIncrease,
      amountDecrease,
      typeChange,
      categoryChange,
      difficultyChange,
    };
  },
  props: {
    amount: Number,
    category: String,
    difficulty: String,
    type: String,
  },
  mounted() {
    this.amount;
    this.category;
    this.difficulty;
    this.type;
  },
});
</script>

<template>
  <div class="start-app">
    <h1 class="app-name">Quizzical</h1>
    <h5 class="app-description">A cool quiz app</h5>
    <form>
      <div class="select-container">
        <label>
          Select Number of Questions:
          <div class="amount-form">
            <input type="text" readonly :value="amount" />
            <button class="amount-btn" type="button" @click="amountIncrease">+</button>
            <button class="amount-btn" type="button" @click="amountDecrease">-</button>
          </div>
        </label>
        <label>
          Select Category:
          <select :value="category" @change="categoryChange">
            <option value="">Any Category</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </label>
        <label>
          Select Type:
          <select :value="type" @change="typeChange">
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/ False</option>
          </select>
        </label>
        <label>
          Select Difficulty:
          <select :value="difficulty" @change="difficultyChange">
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
    </form>
    <button class="app-btn" @click="handleStartChange">Start Quiz</button>
  </div>
</template>
