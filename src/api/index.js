/* eslint-disable import/no-named-as-default */
import * as users from './fake.api/user.api'

// ----------------data from array------------------
// import professions from './fake.api/professions.api'

// ----------------data from object-----------------
import professionsObject from './fake.api/professions.api'
import qualities from './fake.api/qualities.api'

const API = {
  users,
  // ----------------data from array------------------
  // professions,

  // ----------------data from object-----------------
  professionsObject,
  qualities,
}

export default API
