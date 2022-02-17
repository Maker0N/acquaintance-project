import httpService from './http.service'

const professionEndPoint = 'profession/'

const ProfessionService = {
  async get() {
    const { data } = await httpService.get(professionEndPoint)
    return data
  },
}

export default ProfessionService
