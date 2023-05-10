<template>
    <div class="p-4 bg-slate-200 border border-black selection:invisible" >
        <input type="radio" :checked="$props?.option?.isSelected" :disabled="$props.checked" class="appearance-none w-3 h-3 mx-1 border-2 border-solid border-black rounded-full ">
        <label for="option" v-html=" $props?.option?.value"></label>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
    props: {
        option: Object,
        checked: Boolean
    },
})
</script>