import { watch, getCurrentScope, onScopeDispose, unref, ref } from "vue"
export const isString = (val) => typeof val === 'string'
export const noop = () => {}
export function unrefElement(elRef){
    // 获取本来的值
    const plain = unref(elRef)
    return plain.$el??plain
}