<script lang="ts">
import { useQuestionStore } from "../stores/questions";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    question: Object,
    check: Boolean,
  },
  setup(props) {
    const store = useQuestionStore();

    const score = ref(0);
    const options = ref<any[]>([]);
    function setOption() {
      const rand = Math.floor(Math.random() * 4);
      let op = [];
      options.value = [];
      op = [...props?.question?.incorrect_answers];
      op.splice(rand, 0, props?.question?.correct_answer);
      for (let x = 0; x < op.length; x++) {
        options.value.push({ value: op[x], isSelected: false });
      }
    }

    function handleClick(optionv: any) {
      if (!props?.check) {
        options.value = options.value.map((option) =>
          option.value === optionv
            ? { ...option, isSelected: !option.isSelected }
            : { ...option, isSelected: false }
        );
      }
    }

    function calcScore() {
      const checkAnswer = options.value.filter(
        (option) =>
          option.isSelected && option.value === props?.question?.correct_answer
      );
      score.value += checkAnswer.length;
      store.score = checkAnswer.length
        ? store.score + checkAnswer.length
        : score.value > 0
        ? store.score - 1
        : store.score;
      console.log(checkAnswer);
    }
    return { score, handleClick, calcScore, setOption, options };
  },
  mounted() {
    this.setOption();
  },
  watch: {
    options(oldScore, newScore) {
      oldScore != newScore && this.calcScore();
    },
  },
});
</script>
<template>
  <div class="flex items-center justify-center p-3">
    <div class="question py-3">
      <h1
        class="text-blue-900 font-bold text-center text-sm sm:text-base"
        v-html="question?.question"
      ></h1>
      <div class="flex items-center justify-center">
        <div
          v-for="option in options"
          :key="option"
          v-html="option.value"
          class="option px-2 border border-blue-500 rounded-lg mx-2 my-2 text-xs cursor-pointer selection:invisible"
          :class="{
            'border-hidden bg-blue-500 text-white': option.isSelected,
            'opacity-60':
              option.value !== $props?.question?.correct_answer &&
              $props?.check,
            'bg-red-300 border border-red-400 opacity-70 text-black':
              option.isSelected &&
              option.value !== $props?.question?.correct_answer &&
              $props?.check,
            'bg-green-300 border-hidden':
              option.value === $props?.question?.correct_answer &&
              $props?.check,
          }"
          @click="handleClick(option.value)"
        ></div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <hr class="w-4/5" />
  </div>
</template>
