<template>
    <div>这是注入的内容{{ count }}</div>
    <grandchildren v-bind="$attrs"/>
</template>

<script>
import { defineComponent, inject } from "vue"
import grandchildren from "./grandchildren.vue"
export default {
    components: {
        grandchildren
    },
    setup(props, { attrs }){
        console.log(props, attrs)
        const count = inject('count')
        return { count }
    }
}
</script>

<style>

</style>