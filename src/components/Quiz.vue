<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            msg: String
        },
        mounted() {
            this.msg
        }
    })
</script>

<template>
    <h1>{{ msg }}</h1>
</template>