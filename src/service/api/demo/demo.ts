//login.ts
import http from '@/service/axios'
import * as T from './types'

const loginApi: T.ILoginApi = {
  
  test(params) {
    return http.get('/getUsers', params)
  },
  getList(params){
    return http.get('/getList', params)
  }
}

export default loginApi
