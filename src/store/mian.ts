import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mian',
  state:() => {
    return {
      name: '超级管理员',
    }
  },
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    nameChange(data: string) {
      // 可以做异步 async await
      this.name = data
    },
  },
})
