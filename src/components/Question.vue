<script lang="ts">
import { useQuestionStore } from "../stores/questions";
import { defineComponent, ref, watch ,} from "vue";
import Option from "./Option.vue";
export default defineComponent({
  props: {
    question: Object,
    check: Boolean,
  },
  emits: ['chooseOption'],
  setup(props, {emit}) {
    const store = useQuestionStore();
    const score = ref(0);
    const picked = ref(false)
    const options = ref(props?.question?.options)
    watch( () => props?.question?.question, 
    newQuestion => {
      options.value = props?.question?.options
    })
    function handleChoose(op: any) {
      emit('chooseOption',op)
      console.log("omooo")
      options.value = props?.question?.options
    }

    function calcScore() {
      const checkAnswer = options.value.filter(
        (option: { isSelected: any; value: any; }) =>
          option.isSelected && option.value === props?.question?.correct_answer
      );
      score.value += checkAnswer.length;
      store.score = checkAnswer.length
        ? store.score + checkAnswer.length
        : score.value > 0
        ? store.score - 1
        : store.score;
      }
      return { score, calcScore, options, store, handleChoose, picked };
    },
    watch: {
      // options(newScore, oldScore) {
        //   console.log("chaiii")
        //   oldScore != newScore && this.calcScore();
        // },
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
        v-for="option in options" :key="option">
          <Option :option="option" :checked="$props.check" @click="!$props.check && handleChoose(option.value) "/>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <hr class="w-4/5" />
  </div>
</template>
