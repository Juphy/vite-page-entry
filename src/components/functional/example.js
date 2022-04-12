import { reactive } from "vue";
export default function useFeaureX(){
    const state = reactive({
        name: 'Tom',
        age: 12
    })
    return { state }
}