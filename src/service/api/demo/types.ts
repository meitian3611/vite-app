// 此文件定义接口类型，接口约束
export interface ILoginParams {
  userName?: string
  passWord?: string | number
}
export interface IGetListParams {
  id:number
  adminName?:string
}
export interface ILoginApi {
  test: (params: ILoginParams) => Promise<any>
  getList: (params: IGetListParams) => Promise<any>
}