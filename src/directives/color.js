export const color = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
    console.log('directive', 'created')
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {
    console.log('directive', 'beforeMount')
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    el.style.color = binding.value
    console.log('directive', 'mounted')
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate() {
    console.log('directive', 'beforeUpdate')
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding) {
      el.style.color = binding.value
      console.log('directive', 'updated')
  },
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {
    console.log('directive', 'beforeUnmount')
  },
  // 绑定元素的父组件卸载后调用
  unmounted() {
    console.log('directive', 'unmounted')
  }
}
// 生命周期与子组件类似
