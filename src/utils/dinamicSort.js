export default function dinamicSort(property, order) {
  let sortOrder = 1
  if (order === 'desc') {
    sortOrder = -1
  }
  if (property.includes('.')) {
    const propertyArr = property.split('.')
    const [property1, property2] = propertyArr
    return function sort(a, b) {
      if (a[property1][property2] > b[property1][property2]) {
        return 1 * sortOrder
      }
      if (a[property1][property2] < b[property1][property2]) {
        return -1 * sortOrder
      }
      return 0 * sortOrder
    }
  }
  return function sort(a, b) {
    if (a[property] > b[property]) {
      return 1 * sortOrder
    }
    if (a[property] < b[property]) {
      return -1 * sortOrder
    }
    return 0 * sortOrder
  }
}
