<template>
  <div>
    {{ msg }}
  <el-button type="primary" @click="msgClick">修改</el-button>
  </div>
  <div class="cls">我是个文字，我会通过 v-bind 变颜色</div>
  <el-button @click="colorClick">点击改变颜色</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let msg = ref('hello 我是一个组件!')
let color = ref("#333")
const msgClick = () => msg.value = "我被按钮给修改了！"
const colorClick = () => color.value = "#f40"

</script>

<style lang="scss" scoped>
.cls{
  color: v-bind(color); // 动态绑定：vue3.2 新增特性
}
</style>
