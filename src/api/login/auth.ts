import { AxiosResponse } from 'axios'
import { instance } from '../instance'
import { ResponseType } from '../types'

export type LoginType = {
  email: string
  password: string
  rememberMe?: boolean
}

export const auth = {
  me() {
    return instance.get<
      ResponseType<{ email: string; id: number; login: string }>
    >('/auth/me/')
  },
  login(payload: LoginType) {
    console.log('login')
    return instance.post<
      { payload: LoginType },
      AxiosResponse<ResponseType<{ userId: number }>>
    >('/auth/login/', { ...payload })
  },
  logout() {
    console.log('logout')
    return instance.delete<ResponseType<null>>('/auth/login/')
  },
}
