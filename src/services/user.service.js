import httpService from './http.service'

const userEndPoint = 'user/'

const userService = {
  async get() {
    const { data } = await httpService.get(userEndPoint)
    return data
  },
}

export default userService
