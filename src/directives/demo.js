export const demo = (el, binding) => {
    let { color, text } = binding.value
    el.style.color = color
    el.text = text
}