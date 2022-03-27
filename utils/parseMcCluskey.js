/**
 *
 * @param {Array} expression
 * @returns
 */
function getExpression(expression) {
  let asciiChar = 65
  const newExpression = expression.map((bit) => {
    if (bit === '-') {
      asciiChar++
      return
    }
    const char = String.fromCharCode(asciiChar)
    asciiChar++
    return bit ? char : `~${char}`
  })
  return newExpression.join('')
}

module.exports = {
  getExpression
}
