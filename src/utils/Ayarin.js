function capitalize(str) {
  if (!str) {
    return ''
  }

  str = str.toString()

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  capitalize,
}
