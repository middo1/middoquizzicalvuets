<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            msg: Array
        },
        mounted() {
            this.msg // what's this?
        }
    })
</script>

<template>
    <h1>{{ msg }}</h1>
</template>