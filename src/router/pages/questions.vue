<script lang="ts">
import Question from "../../components/Question.vue";
import { defineComponent, ref } from "vue";
import { useQuestionStore } from "../../stores/questions";
import Loading from "../../components/Loading.vue";
export default defineComponent({
  components: {
    Question,
    Loading,
  },
  setup() {
    const store = useQuestionStore();

    const restart = ref<number>(0);
    const check = ref<boolean>(false);

    function handleCheck() {
      if (check.value) {
        check.value = !check.value;
        restart.value += 1;
        store.score = 0;
      } else {
        check.value = !check.value;
      }
    }

    return { store, check, handleCheck, restart };
  },
  mounted() {
    this.store.getQuestions();
  },
  watch: {
    restart(oldRestart, newRestart) {
      this.store.getQuestions();
    },
  },
});
</script>
<template class="p-3">
  <div class="flex justify-center items-center gap-2 py-3 text-blue-900">
    <h2>Category: {{ store?.category === "" ? store.categories[0] : store.categories[ ParseInt( store?.category) - 9] }}</h2>
    <h2>
      Type:
      {{
        store.type === ""
          ? store.types[0]
          : store.type === "boolean"
          ? store.types[2]
          : store.types[1]
      }}
    </h2>
    <h2>
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
  <Teleport to="body">
    <div
      v-if="store.questions.length < 1"
      class="modal flex items-center justify-center p-5 border border-blue-500 rounded-md"
    >
      <Loading class="text-blue-700 mx-2" />
      <h3>Loading...</h3>
    </div>
  </Teleport>
  <div v-if="store.questions.length > 1" class="px-3">
    <template v-for="question in store.questions" :key="question?.question">
      <Question :question="question" :check="check" />
    </template>
    <div
      class="flex justify-center items-center gap-2 my-3 flex-col sm:flex-row"
    >
      <div class="flex row gap-2">
        <button
          @click="handleCheck()"
          class="btn px-3 py-1 bg-blue-500 rounded-md text-white"
        >
          {{ check ? "Play Again" : "Check Answer" }}
        </button>
        <button
          @click="() => $router.push({ name: 'index' })"
          class="btn px-3 py-1 bg-blue-500 rounded-md text-white"
        >
          Reset Questions
        </button>
      </div>
      <h3 v-if="check" class="text-blue-900 font-bold">
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
</style>
