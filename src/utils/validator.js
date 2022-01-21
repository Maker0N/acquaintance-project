/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default function validator(data, config) {
  const errors = {}
  function validate(validateMethod, data, config) {
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean' && data === false) {
          return config.message
        }
        if (typeof data === 'string' && data.trim() === '') return config.message
        break
      }

      case 'isEmail': {
        const emailRegexp = /^\S+@\S+\.\S+$/g
        if (!emailRegexp.test(data)) return config.message
        break
      }

      case 'isCapital': {
        const capitalRegexp = /[A-Z]+/g
        if (!capitalRegexp.test(data)) return config.message
        break
      }

      case 'isSymbol': {
        const symbolRegexp = /\d+/g
        if (!symbolRegexp.test(data)) return config.message
        break
      }

      case 'isMin': {
        if (data.length < config.value) return config.message
        break
      }

      default:
        break
    }
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod],
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
