<template>
  <div>count: {{ state.count }}</div>
  <div>num: {{ num }}</div>
  <input type="text" v-model="state.count" />
  <input type="text" v-model="num" />
  <button @click="handleClick">增加count减小num</button>
  <div>computed1: {{ computed1 }}</div>
  <div>computed2: {{ computed2 }}</div>
  <div>computed3: <input type="text" v-model="computed3" /></div>
  <div>name: {{ name }}</div>
  <div>age: {{ age }}</div>
  <p>Using text interpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
  <div v-bind="objectOfAttrs">id, class: {{objectOfAttrs}}</div>
</template>
<script>
import { ref, reactive, toRefs, watch, computed, watchEffect } from "vue"
import useFeaureX from "./functional/example"
export default {
  setup() {
    const state = reactive({
      count: 1
    })
    let num = ref(0)
    let computed1 = computed(() => state.count + 1)
    let computed2 = computed(() => num.value + 1)
    let computed3 = computed({
      get() {
        return state.count + num.value
      },
      set(value) {
        state.count = value / 2
        num.value = value / 2
      }
    })
    let handleClick = () => {
      state.count += 1
      num.value -= 1
    }

    const {state: featurex} = useFeaureX()

    const rawHtml = ref('<span style="color: red">This should be red.</span>')

    const objectOfAttrs = {
        id: 'container',
        class: 'warpper'
    }
    return {
      state,
      num,
      computed1,
      computed2,
      computed3,
      handleClick,
      ...toRefs(featurex),
      rawHtml,
      objectOfAttrs
    }
  }
}
</script>

<style></style>
