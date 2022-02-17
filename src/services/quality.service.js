import httpService from './http.service'

const qualityEndPoint = 'quality/'

const qualityService = {
  async get() {
    const { data } = await httpService.get(qualityEndPoint)
    return data
  },
}

export default qualityService
