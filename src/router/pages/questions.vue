<script lang="ts">
import Question from '../../components/Question.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Question
    }
})

</script>
<template>
    <h1 class="text-slate-700 text-3xl ">Question</h1>
    <Question />
</template>
