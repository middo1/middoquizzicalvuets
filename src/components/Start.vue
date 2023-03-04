<script lang="ts">
import { assert } from '@vue/compiler-core';
import { defineComponent, watch } from 'vue';
import { useQuestionStore } from '../stores/questions';

export default defineComponent({
    setup() {
        const store = useQuestionStore()

        // watch(() => store.category, (value) => {
        //     console.log(value)
        // })

        return { store }
    },
})
</script>
<template>
    <div>
        <h1>Quizical</h1>
        <h3>A cool Quiz app</h3>
        <div>
            <label>
                SELECT NUMBER OF QUESTION:
                <div>
                    <input type="type" :value="store.amount" readonly   />
                    <button @click="store.amount < 50 ? store.amount += 5 : store.amount">+</button>
                    <button @click="store.amount > 5 ? store.amount -= 5 : store.amount">-</button>
                </div>
            </label>
            <label>
                SELECT CATEGORY:
                <select v-model="store.category">
                    <option v-for="category in store.categories"
                        :value="store.categories.indexOf(category) > 0 ? String(store.categories.indexOf(category) + 9) : ''">
                        {{ category }}</option>
                </select>
            </label>

            <label>
                SELECT TYPE:
                <select v-model="store.type">
                    <option v-for="type in store.types"
                        :value="store.types.indexOf(type) > 0 ? store.types.indexOf(type) > 1 ? 'boolean' : 'mutlple' : ''">
                        {{ type }}</option>
                </select>
            </label>

            <label>
                SELECT DIFFICULTY:
                <select v-model="store.difficulty">
                    <option v-for="difficulty in store.difficulties"
                        :value="store.difficulties.indexOf(difficulty) > 0 ? difficulty.toLowerCase() : ''">{{ difficulty }}
                    </option>
                </select> 
            </label>
    </div>
    <div>
        <button @click="() => $router.push({name: 'questions'})">Start</button>
    </div>
</div></template>