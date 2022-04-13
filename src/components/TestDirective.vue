<template>
  <div v-color="color">文字颜色: {{color}}</div>
  <div v-demo="colorObj">文字颜色: {{colorObj.color}}  文本内容: {{colorObj.text}}</div>
  <button @click="changeColor">改变颜色</button>
  <button @click="changeText">改变文本</button>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
    setup(){
        const color = ref('red'),
            colorObj = reactive({
                color: 'green',
                text: 'Hello World'
            })
        const changeColor = () => {
            if(Math.random() > 0.5){
                color.value = 'lime';
                colorObj.color = 'lime'
            }else{
                color.value = 'skyblue';
                colorObj.color = 'skyblue'
            }
        }
        const changeText = () => {
            colorObj.text = '你好'
        }
        return { color, colorObj, changeColor, changeText}
    }
}
</script>

<style></style>
