<template>
  <children @setColor="setColor"></children>
  <button @click="count++">添加</button>
</template>
<script>
import { provide, ref } from "vue"
import children from "./children.vue"
export default {
  components: {
    children
  },
  setup() {
    const count = ref(0)
    const color = ref("#000")
    provide("count", count)
    provide("color", color)
    function setColor(val) {
      color.value = val
    }
    return {
      count,
      setColor
    }
  }
}
</script>

<style></style>
