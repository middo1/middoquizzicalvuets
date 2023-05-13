<template>
    <div class="p-4 bg-slate-200 border selection:invisible m-3 rounded-lg" :class="{
        ' bg-slate-300 text-zinc-900': $props?.option?.isSelected,
        ' opacity-60': $props?.option?.value !== $props?.correct && $props.checked,
        ' bg-red-300': $props?.option?.isSelected && $props?.option?.value !== $props?.correct && $props.checked,
        'bg-green-300': $props?.option?.value === $props?.correct && $props.checked,
    }">
        <input type="radio" :checked="$props?.option?.isSelected" :disabled="$props.checked" class="appearance-none w-3 h-3 mx-1 border-2 border-solid border-zinc-400 rounded-full" :class="{
            'bg-blue-800': $props?.option?.isSelected,
            
        }">
        <label for="option" v-html=" $props?.option?.value" class="text-zinc-800" :class="{
            '' : $props?.option?.isSelected
        }"></label>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
    props: {
        option: Object,
        checked: Boolean,
        correct: String
    },
})
</script>