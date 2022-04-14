/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const Profession = require('../models/Profession')
const Quality = require('../models/Quality')
const professionsMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')

async function createInitialEntity(Model, data) {
  return Promise.all(
    data.map(async (item) => {
      if (Model.collection.length) {
        await Model.collection.drop()
      }
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        return error.message
      }
    }),
  )
}

module.exports = async () => {
  const professions = await Profession.find()
  if (professions.length !== professionsMock.length) {
    await createInitialEntity(Profession, professionsMock)
  }

  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}
