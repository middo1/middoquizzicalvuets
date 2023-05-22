<script lang="ts">
import Question from "../../components/Question.vue";
import { defineComponent, ref, watch } from "vue";
import { useQuestionStore } from "../../stores/questions";
import Loading from "../../components/Loading.vue";
import { useRoute, useRouter } from "vue-router";
import router from "..";
export default defineComponent({
  components: {
    Question,
    Loading,
  },
  setup() {
    const store = useQuestionStore();
    const restart = ref<number>(0);
    const route = useRoute()
    const check = ref<boolean>(false);
    const router = useRouter()
    const id_ = ref(route.params.id)
    const drop = ref(false)
    
    function calcScore() {
      console.log("omoooo")
      var score = 0
      const checkAnswer = store.questions[+route.params.id].options.filter(
        (option: { isSelected: any; value: any; }) =>
          option.isSelected && option.value === store.questions[+route.params.id].correct_answer
      );
      score += checkAnswer.length;
      store.score = checkAnswer.length
        ? store.score + checkAnswer.length
        : score > 0
        ? store.score - 1
        : store.score;
    }
    function handleCheck() {
      if (check.value) {
        check.value = !check.value;
        restart.value += 1;
        store.score = 0;
        router.push({name: 'questions', params : { id : "0"}})
      } else {
        router.push({name: 'questions', params : { id : "0"}})
        !check.value && calcScore()
        check.value = !check.value;
      }
    }

    function prevQuestion(){
      id_.value = String(+route.params.id - 1)
    }
    
    function nextQuestion(){
      id_.value = String(+route.params.id + 1)
      !check.value && calcScore()
    }
    function handleClick(optionv: any) {
      if (!check.value) {
        store.questions[+route.params.id].options = store.questions[+route.params.id].options.map((option: { value: any; isSelected: any; }) =>
        option.value === optionv
        ? { ...option, isSelected: !option.isSelected }
        : { ...option, isSelected: false }
        );
      }
    }
    return { store, check, handleCheck, restart, nextQuestion, id_, prevQuestion, handleClick, drop };
  },
  mounted() {
    this.store.getQuestions();
    this.store.setOptions()
  },
  watch: {

    restart(newRestart, oldRestart) {
      this.store.getQuestions();
    },
    id_(newId, oldId){
      this.$router.push({name: "questions", params : {id: newId}})
    }
    
  },
});
</script>
<template class="p-3">
  <Teleport to="body">
    <div
      v-if="store.questions.length < 1"
      class="modal flex items-center justify-center p-5 border border-blue-500 rounded-md"
    >
      <Loading class="text-blue-700 mx-2" />
      <h3>Loading...</h3>
    </div>
  </Teleport>
  <div class="flex items-center gap-2 py-5 text-blue-900 bg-slate-100 flex-grow justify-between">
    <h1 class="hd text-2xl text-blue-700 -top-9 px-2">Quizzical</h1>
    <div class="flex items-end">
      <div class="dropdown px-5">
        <button @click="drop = !drop">Details</button>
      </div>
    </div>
  </div>
  <div class="dropdown-content overflow-auto shadow-slate-600 text-blue-900 bg-slate-100" :class="{
    'hidden': !drop,
    'flex flex-col items-center justify-center': drop,
  }">
    <h2 class="text-xs md:text-base">Category: {{ store?.category === "" ? store.categories[0] : store.categories[ Number( store?.category) - 9] }}</h2>
    <h2 class="text-xs md:text-base">
      Type:
      {{
        store.type === ""
          ? store.types[0]
          : store.type === "boolean"
          ? store.types[2]
          : store.types[1]
      }}
    </h2>
    <h2 class="text-xs md:text-base">
      Difficulty:
      {{
        store.difficulty === ""
          ? store.difficulties[0]
          : store.difficulty === "easy"
          ? store.difficulties[1]
          : store.difficulty === "medium"
          ? store.difficulties[2]
          : store.difficulties[3]
      }}
    </h2>
  </div>
  <div v-if="store.questions.length > 1" class="px-3">
    <!-- <template v-for="question in store.questions" :key="question?.question">
    </template> -->
    <Question :question="store.questions[+$route.params.id]" :check="check" @choose-option="(v) => handleClick(v)"/>
    <div
      class="flex justify-center items-center gap-2 my-3 flex-col sm:flex-row"
    >
      <div class="flex row gap-2">
        <button
        v-if="+$route.params.id === store.questions.length - 1"
        @click="() => $router.push({ name: 'index' })"
        class="btn px-3 py-1 bg-blue-500 rounded-md text-white text-sm md:text-base"
        >
        Reset Questions
        </button>
        <button
        v-if="+$route.params.id > 0"
        @click="prevQuestion"
        class="btn px-3 py-1 bg-blue-500 rounded-md text-white text-sm md:text-base"
        >
        Prev
      </button>
      <button
      v-if="+$route.params.id < store.questions.length - 1"
      @click="nextQuestion"
      class="btn px-3 py-1 bg-blue-500 rounded-md text-white text-sm md:text-base"
      >
      Next
    </button>
    <button
      v-if="+$route.params.id === store.questions.length - 1"
      @click="handleCheck()"
      class="btn px-3 py-1 bg-blue-500 rounded-md text-white text-sm md:text-base"
    >
      {{ check ? "Play Again" : "Check Answer" }}
    </button>
  </div>
  <h3 v-if="check" class="text-blue-900 font-bold text-sm">
    You scored {{ store.score }}/{{ store.questions.length }}
  </h3>
</div>
</div>
</template>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 40%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
.btn:focus {
  outline: none;
}

.btn:active {
  box-shadow: inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7);
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
