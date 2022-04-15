<template>
  <div ref="composition">测试compositionApi</div>
</template>

<script>
import { computed, ref, inject, watchEffect } from "vue"
export default {
  setup(props, { attrs, emit, slots, expose }) {
    // 获取页面元素
    const composition = ref(null)
    // 依赖注入
    const count = inject("foo", "1")
    // 响应式结合
    const num = ref(0)
    // 钩子函数
    onMounted(() => {
      console.log("this is a hook")
    })
    // 计算属性
    const nums = computed(() => num.value + 1)
    watch(num, (newVal, oldVal) => {
        console.log('num has changed')
    })
    watchEffect(() => {
        console.log('effect wacthed')
    })
    return {
        num, count
    }
  }
}
</script>

<style></style>
