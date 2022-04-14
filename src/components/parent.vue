<template></template>

<script>
import { defineComponent, provide } from "vue"
export default defineComponent({
    setup(){
        const count = ref(0)
        const color = ref('#000')
        provide('count', count)
        provide('color', color)
    }
})
</script>

<style></style>
