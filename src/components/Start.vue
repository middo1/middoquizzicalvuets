<script lang="ts">
import { assert } from "@vue/compiler-core";
import { defineComponent, watch } from "vue";
import { useQuestionStore } from "../stores/questions";

export default defineComponent({
  setup() {
    const store = useQuestionStore();

    // watch(() => store.category, (value) => {
    //     console.log(value)
    // })

    return { store };
  },
});
</script>
<template>
  <div class="h-full items-center justify-center flex p-3">
    <div class="flex flex-col gap-6 justify-center items-center">
      <div>
        <h1 class="text-2xl text-blue-700">Quizzical</h1>
        <h3 class="text-sm text-gray-500">A cool Quiz app</h3>
      </div>
      <div class="flex flex-col gap-4 form-group">
        <label>
          <span> SELECT NUMBER OF QUESTION: </span>
          <div class="flex gap-2">
            <input
              class="flex-grow border border-gray-300 focus:outline-0 outline-none px-3 rounded-md"
              type="type"
              :value="store.amount"
              readonly
            />
            <button
              class="px-3 py-1 bg-gray-200 rounded-md active:bg-blue-500"
              @click="store.amount < 50 ? (store.amount += 5) : store.amount"
            >
              +
            </button>
            <button
              class="px-3 py-1 bg-gray-200 rounded-md active:bg-blue-500"
              @click="store.amount > 5 ? (store.amount -= 5) : store.amount"
            >
              -
            </button>
          </div>
        </label>
        <label>
          <span> SELECT CATEGORY: </span>
          <select v-model="store.category">
            <option
              v-for="category in store.categories"
              :value="
                store.categories.indexOf(category) > 0
                  ? String(store.categories.indexOf(category) + 9)
                  : ''
              "
              :key="category"
            >
              {{ category }}
            </option>
          </select>
        </label>

        <label>
          <span> SELECT TYPE: </span>
          <select v-model="store.type">
            <option
              v-for="type in store.types"
              :value="
                store.types.indexOf(type) > 0
                  ? store.types.indexOf(type) > 1
                    ? 'boolean'
                    : 'multiple'
                  : ''
              "
              :key="type"
            >
              {{ type }}
            </option>
          </select>
        </label>

        <label>
          <span> SELECT DIFFICULTY: </span>
          <select v-model="store.difficulty">
            <option
              v-for="difficulty in store.difficulties"
              :value="
                store.difficulties.indexOf(difficulty) > 0
                  ? difficulty.toLowerCase()
                  : ''
              "
              :key="difficulty"
            >
              {{ difficulty }}
            </option>
          </select>
        </label>
      </div>
      <div class="flex justify-center items-center">
        <button
          class="btn bg-blue-500 py-1 px-3 rounded-md text-white"
          @click="() => $router.push({ name: 'questions' })"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.form-group {
  > label {
    display: flex;
    flex-direction: column;
    gap: 2px;

    > span {
      @apply text-sm;
    }

    > select {
      @apply py-1 px-3 bg-gray-200 rounded-md;
    }
  }
}
.btn:focus {
  outline: none;
}

.btn:active {
  box-shadow: inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7);
}
</style>
