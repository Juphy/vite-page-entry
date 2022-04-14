<template>
  <div v-color="color">文字颜色: {{ color }}</div>
  <div v-demo="colorObj">
    文字颜色: {{ colorObj.color }} 文本内容: {{ colorObj.text }}
  </div>
  <button @click="changeColor">改变颜色</button>
  <button @click="changeText">改变文本</button>
  <render-btn :type="type">按钮在这里</render-btn>
  <button @click="changeType">修改按钮类型</button>
</template>

<script>
import { reactive, ref } from "vue"
import { renderBtn } from "@coms/functional"
export default {
  components: {
    renderBtn
  },
  setup() {
    const color = ref("red"),
      colorObj = reactive({
        color: "green",
        text: "Hello World"
      })
    const changeColor = () => {
      if (Math.random() > 0.5) {
        color.value = "lime"
        colorObj.color = "lime"
      } else {
        color.value = "skyblue"
        colorObj.color = "skyblue"
      }
    }
    const changeText = () => {
      if (Math.random() > 0.5) {
        colorObj.text = "你好"
      } else {
        colorObj.text = "hello world"
      }
    }

    const type = ref(1)
    const changeType = () => {
      if (Math.random() > 0.5) {
        type.value = 2
      } else {
        type.value = 1
      }
    }
    return { color, colorObj, changeColor, changeText, type, changeType }
  },
  beforeCreate() {
    console.log("com", "beforeCreate")
  },
  created() {
    console.log("com", "created")
  },
  beforeMount() {
    console.log("com", "beforeMount")
  },
  mounted() {
    console.log("com", "mounted")
  },
  beforeUpdate() {
    console.log("com", "beforeUpdate")
  },
  updated() {
    console.log("com", "updated")
  },
  beforeUnmount() {
    console.log("com", "beforeUnmount")
  },
  unmounted() {
    console.log("com", "unmounted")
  }
}
</script>

<style></style>
