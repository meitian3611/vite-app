<template>
    <div>
        <p>我是子组件</p>
        <p>{{ msg }}</p>
        <button @click="handleClick">修改</button>
        <p v-for="item in arrList">
            姓名：{{ item.name }}
            年龄：{{ item.age }}
        </p>
    </div>
</template>

<script setup lang='ts'>
import { IarrList } from "@/types/child"

// 非ts写法
// defineProps({ 
//     msg: String,
//     arrList: {
//         type: Array,
//         default: () => {
//             return []
//         }
//     }
// })

type props = {
    msg: string,
    arrList: Array<IarrList>
}
withDefaults( // 使用withDefaults给prop 定义默认值 ---- TS写法
    defineProps<props>(), {
    msg: "",
    arrList: () => []
}
)
// const emits = defineEmits(['clickMsg']) // 非TS写法
const emits = defineEmits<{
    (e: 'clickMsg', data: string): void // TS写法
}>()

const handleClick = (): void => {
    emits('clickMsg', '被子组件修改了')
}


//  模拟子组件独有属性
let testCode = "ABC"
let testArr = [1, 2, 3]

// 将子组件内的属性暴露出去，以供父组件获取，不暴露的属性在父组件只会undefined
defineExpose({
    testCode,
    testArr
})
</script>

<style scoped>
</style>