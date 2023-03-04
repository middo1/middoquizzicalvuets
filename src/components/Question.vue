<script lang="ts">
import { useQuestionStore } from '../stores/questions';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props : {
        question: Object
    },
    setup(props) {
        const store = useQuestionStore()

        const score = ref(0)
        const options = ref<any[]>([])
        function setOption() {
            const rand = Math.floor(Math.random() * 4)
            let op = []
            options.value = []
            op = [...props?.question?.incorrect_answers]
            op.splice(rand, 0, props?.question?.correct_answer)
            for(let x=0;x < op.length;x++) {
                options.value.push({value:op[x],isSelected:false})
            }
        }

        function handleClick(optionv: any) {
            options.value = options.value.map(option => 
                option.value === optionv ?
                {...option, isSelected: !option.isSelected}
                : {...option, isSelected: false}
            )
        }

        function calcScore(){
            const checkAnswer = options.value.filter(option => option.isSelected 
            && option.value === props?.question?.correct_answer)
            score.value += checkAnswer.length
            store.score = checkAnswer.length
            ? store.score + checkAnswer.length
            : score.value > 0 ? store.score - 1 : store.score 
            console.log(checkAnswer)
        }
        return { score, handleClick, calcScore, setOption, options }
    },
    mounted(){
        this.setOption()
    },
    watch : {
        options(oldScore, newScore){
            oldScore != newScore && this.calcScore()
        }
    }
})

</script>
<template>
    <div class="question">
        <h1 class="question-text" v-html="question?.question">
        </h1>
        <div class="option-container">
            <div v-for="option in options"
                v-html="option.value"
                class="option"
                :class="{selected: option.isSelected,
                        incorrect: option.value !== $props?.question?.correct_answer,
                        incorrectSelected: option.isSelected &&  option.value !== $props?.question?.correct_answer,
                        correct: option.value === $props?.question?.correct_answer}"
                @click="handleClick(option.value)">
            </div>
        </div>
        <hr />
    </div>
</template>