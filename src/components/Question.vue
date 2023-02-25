<script lang="ts">
import { useQuestionStore } from '../stores/questions';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const store = useQuestionStore()

        const questions = store.questions

        return { questions }
    }
})

</script>
<template>
    <h1 v-for="question in questions">
        omooo
    </h1>
    <p>omooo</p>
</template>