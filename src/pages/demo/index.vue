<template>
  <div class="test">用户名:{{ name }}<br />长度:{{ nameLength }}</div>
  <hr />
  <button @click="updateName">修改store中的name</button>
  <hr />
  <hello-vue></hello-vue>
  <hr />
  <child-vue :msg="msg" :arrList="arrList" @clickMsg="clickMsg" ref="childRef"></child-vue>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mian'
import HelloVue from '@/components/Hello.vue'
import ChildVue from '@/components/Child.vue'
import demoApi from '@/service/api/demo/demo' // 引入封装完成的API
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

//  Pinia 的使用方法
const mainStore = useMainStore()
const { name, nameLength } = storeToRefs(mainStore) // 如果采用解构的方式，必须使用 storeToRefs 才会存在响应式

const updateName = () => {
  // mainStore.$patch({
  //   name: '我是第二种修改方式',
  // })
  // mainStore.$patch((state:any)=> {
  //   state.name = "我是第三种修改方式"
  // })
  mainStore.nameChange("我是第四种修改方式")
}

// 父子组件的传值
let msg = ref("这是一段父组件传递的文字")
let arrList = reactive([{
  name: "张三",
  age: 18,
  isFlag: true
}, {
  name: "李四",
  age: 25,
  sex: "女",
  isFlag: false,
}])

const clickMsg = (str: string): void => {
  msg.value = str // 接收到子组件传递的参数 ，改变界面数据
}


//  父组件通过ref 获取子组件属性
let childRef = ref()

onMounted(() => {
  // 调用API
  // demoApi.getList({ id: 232, adminName: 'zhang' }).then((res) => {
  //   console.log(res)
  // })

  // 由于setup特性是在 beforeCreate 之前， 获取不到DOM，所以在mounted生命周期获取即可
  console.log(childRef.value.testCode); // ABC
  console.log(childRef.value.testArr); // [1,2,3]
})

</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
</style>
