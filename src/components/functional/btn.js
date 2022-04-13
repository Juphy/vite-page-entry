import btn1 from "./btn1.vue"
import btn2 from "./btn2.vue"
export const renderBtn = (props, context) => {
  return props.type === 1 ? (
    <btn1>{context.slot.default}</btn1>
  ) : (
    <btn2>{context.slots.default()}</btn2>
  )
}
