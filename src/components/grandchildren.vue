<template>
  <div :style="`color: ${color}`">这是注入的内容颜色</div>
  <button @click="setColor">修改颜色</button>
</template>

<script>
import { defineComponent, inject } from "vue"
export default {
  setup(props, { emit }) {
    const color = inject("color")
    function setColor() {
      emit("setColor", "red")
    }
    return {
      color,
      setColor
    }
  }
}
</script>

<style></style>
