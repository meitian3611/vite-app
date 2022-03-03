<template>
  <div class="test">用户名:{{ mainStore.name }}<br />长度:{{ mainStore.nameLength }}</div>
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

const mainStore = useMainStore()

const updateName = () => {
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了',
  })
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
