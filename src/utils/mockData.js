/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import profession from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConstant = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Eroor occured',
  }
  const [err, setErr] = useState(null)
  const [status, setStatus] = useState(statusConstant.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount = profession.length + qualities.length + users.length
  const incrementCount = () => {
    setCount((prev) => prev + 1)
  }
  const updateProgress = () => {
    if (count !== 0 && status === statusConstant.idle) {
      setStatus(statusConstant.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConstant.successed)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const prof of profession) {
        await httpService.put(`profession/${prof._id}`, prof)
        incrementCount()
      }
      for (const user of users) {
        await httpService.put(`users/${user._id}`, user)
        incrementCount()
      }
      for (const qual of qualities) {
        await httpService.put(`qualities/${qual._id}`, qual)
        incrementCount()
      }
    } catch (error) {
      setErr(error)
      setStatus(statusConstant.error)
    }
  }
  return ({
    err, initialize, progress, status,
  })
}

export default useMockData
