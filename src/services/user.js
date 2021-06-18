import request from '@/utils/request'
//登陆
export function login(data) {
  return request({
    url:'https://diltd.steerinfo.com/api/v1/login',
    method:'post',
    data
  })
}
//设置token
export function getInfo(token) {
  return request({
    url: 'https://diltd.steerinfo.com/api/v1/login',
    method: 'get',
    params: { token }
  })
}
//退出登陆
export function logout() {
  return request({
    url: 'https://diltd.steerinfo.com/api/v1/login',
    method: 'post'
  })
}
