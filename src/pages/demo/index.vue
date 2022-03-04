<template>
  <div class="test">用户名:{{ name }}<br />长度:{{ nameLength }}</div>
  <hr />
  <button @click="updateName">修改store中的name</button>
  <hr />
  <n-button>naive-ui</n-button>
  <hr />
  <hello-vue></hello-vue>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mian'
import HelloVue from '@/components/Hello.vue'
import { NButton } from 'naive-ui'
import demoApi from '@/service/api/demo/demo' // 引入封装完成的API
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { name , nameLength} = storeToRefs(mainStore) // 如果采用解构的方式，必须使用 storeToRefs 才会存在响应式

const updateName = () => {
  // mainStore.$patch({
  //   name: '我是第二种修改方式',
  // })
  // mainStore.$patch((state:any)=> {
  //   state.name = "我是第三种修改方式"
  // })
  mainStore.nameChange("我是第四种修改方式")
}
onMounted(() => {
  demoApi.getList({ id: 232, adminName: 'zhang' }).then((res) => {
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
