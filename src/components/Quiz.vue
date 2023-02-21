<script lang="ts">
    import { defineComponent, ref, } from 'vue' 

    export default defineComponent({
        props: {
            question: Object,
            check: Boolean
        },
        setup(props, {emit}) {const options = ref<any[]>([])

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
                options.value = options.value.map( option => 
                    option.value === optionv ?
                    {...option, isSelected: !option.isSelected}
                    : {...option, isSelected: false}
                )
            }

            function calcScore(){
                let score = 0
                const checkAnswer = options.value.filter(option => option.isSelected 
                && option.value === props?.question?.correct_answer)
                score = checkAnswer.length
                ? score + 1
                : 0

                emit("calcScore", score)
            }
            return {
                options,
                setOption,
                handleClick,
                calcScore
            }
        },
        created() {
            this.setOption()
            this.calcScore()
        },
        watch : {
            question(newOptions, oldOption) {
                this.setOption()
            },
            options(newOption, oldOption){
                this.calcScore()
            }
        }
    })
</script>

<template>
    <div className="question">
        <h1 className="question-text" v-html="question?.question">
        </h1>
        <div class="option-container">
            <div v-for="option in options"
                v-html="option.value"
                class="option"
                :class="{selected: option.isSelected,
                        incorrect: $props.check &&  option.value !== $props?.question?.correct_answer,
                        incorrectSelected: $props.check && option.isSelected &&  option.value !== $props?.question?.correct_answer,
                        correct: $props.check && option.value === $props?.question?.correct_answer}"
                @click="handleClick(option.value)">
            </div>
        </div>
        <hr />
    </div>
</template>