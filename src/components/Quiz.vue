<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            msg: Array
        },
        mounted() {
            this.msg
        }
    })
</script>

<template>
    <h1>{{ msg }}</h1>
</template>