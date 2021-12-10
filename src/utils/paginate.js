export default function paginate(items, pageNumber, sizePage) {
  const startIndex = (pageNumber - 1) * sizePage
  return [...items].splice(startIndex, sizePage)
}
