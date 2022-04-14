<template>
  <div>
    这是btn{{ num }}
    <slot></slot>
  </div>
</template>
<script>
import { ref, defineComponent } from "vue"
export default defineComponent({
    name: 'v-btn2',
    setup(){
        const num = ref(2)
        return { num }
    }
})
</script>
