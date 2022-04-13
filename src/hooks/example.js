import { reactive } from "vue";
export function useFeaureX(){
    const state = reactive({
        name: 'Tom',
        age: 12
    })
    return { state }
}