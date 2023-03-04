<script lang="ts">
import Question from '../../components/Question.vue';
import { defineComponent, ref } from 'vue';
import { useQuestionStore } from '../../stores/questions';
export default defineComponent({
    components: {
        Question
    },
    setup(){
        const store = useQuestionStore()

        const restart = ref<number>(0)
        const check = ref<boolean>(false)

        function handleCheck(){
            if(check.value){
                check.value = !check.value
                restart.value += 1
            } else {
                check.value = !check.value
            }
        }

        return {store, check, handleCheck, restart}
    }, mounted(){
        this.store.getQuestions()
    }, watch : {
        restart(oldRestart, newRestart){
            this.store.getQuestions()
        }
    }
})

</script>
<template>
    <h1 class="text-slate-700 text-3xl ">Question</h1>
    <Teleport to="body">
        <div v-if="store.questions.length < 1" class="modal">
            <h3>Loading...</h3>
        </div>
    </Teleport>
    <div v-if="store.questions.length > 1">
        <template v-for="question in store.questions" >
            <Question :question="question"/>
        </template>
        <button @click="handleCheck()">{{check ? "Play Again" :"Check Answer"}}</button>
        <button @click="() => $router.push({name: 'index'})">Reset Questions</button>
        <h3 v-if="check">
            You scored {{ store.score }}/ {{ store.questions.length }}
        </h3>
    </div>
</template>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px black solid;
}
</style>
